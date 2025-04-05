// src/server/api/routers/snippet.ts
import { z } from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "~/server/api/trpc";
import { type Prisma } from "@prisma/client";

export const snippetRouter = createTRPCRouter({
  // ... other procedures

  getInfiniteSnippets: publicProcedure
    .input(
      z.object({
        limit: z.number().min(1).max(100).default(10),
        cursor: z.string().nullish(),
        searchQuery: z.string().optional(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const { limit, cursor, searchQuery } = input;
      
      // Build the where condition based on search query
      let whereCondition: Prisma.CodeSnippetWhereInput = {};
      
      if (searchQuery && searchQuery.trim() !== "") {
        // Clean the search term
        const searchTerm = searchQuery.trim();
        
        // If the search term is a language name, search only by language
        const isLanguageSearch = /^(javascript|typescript|python|java|c#|go|rust|ruby|php|html|css|sql|bash|swift|kotlin)$/i.test(searchTerm);
        
        if (isLanguageSearch) {
          whereCondition = {
            language: {
              equals: searchTerm,
              mode: "insensitive",
            },
          };
        } else if (searchTerm.startsWith("#")) {
          // Search for specific tag - remove the # symbol
          const tagToSearch = searchTerm.substring(1);
          whereCondition = {
            tags: {
              has: tagToSearch,
            },
          };
        } else {
          // Search in multiple fields
          whereCondition = {
            OR: [
              // Search in title
              {
                title: {
                  contains: searchTerm,
                  mode: "insensitive",
                },
              },
              // Search in description
              {
                description: {
                  contains: searchTerm,
                  mode: "insensitive",
                },
              },
              // Search in code content
              {
                code: {
                  contains: searchTerm,
                  mode: "insensitive",
                },
              },
              // Search in tags
              {
                tags: {
                  has: searchTerm,
                },
              },
              // Search by user
              {
                user: {
                  userName: {
                    contains: searchTerm,
                    mode: "insensitive",
                  },
                },
              },
            ],
          };
        }
      }

      const snippets = await ctx.db.codeSnippet.findMany({
        take: limit + 1,
        where: whereCondition,
        cursor: cursor ? { snippetId: cursor } : undefined,
        orderBy: {
          createdAt: "desc",
        },
        include: {
          user: {
            select: {
              userId: true,
              userName: true,
            },
          },
          _count: {
            select: {
              likes: true,
              comments: true,
            },
          },
        },
      });

      let nextCursor: typeof cursor = undefined;
      if (snippets.length > limit) {
        const nextItem = snippets.pop();
        nextCursor = nextItem?.snippetId;
      }

      return {
        items: snippets,
        nextCursor,
      };
    }),

  // ... other procedures
});