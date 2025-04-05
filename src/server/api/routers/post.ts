// src/server/api/routers/post.ts
import { z } from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "~/server/api/trpc";
import { type Prisma } from "@prisma/client";

export const postRouter = createTRPCRouter({
  // ... other procedures

  getInfinitePosts: publicProcedure
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
      let whereCondition: Prisma.PostWhereInput = {};
      
      if (searchQuery && searchQuery.trim() !== "") {
        // Check if the search term starts with a hashtag
        const searchTerm = searchQuery.trim();
        const isHashtag = searchTerm.startsWith("#");
        
        if (isHashtag) {
          // Search only in hashtags, remove the # symbol
          const tagToSearch = searchTerm.substring(1);
          whereCondition = {
            hashTags: {
              has: tagToSearch,
            },
          };
        } else {
          // Search in both content and hashtags
          whereCondition = {
            OR: [
              {
                content: {
                  contains: searchTerm,
                  mode: "insensitive",
                },
              },
              {
                hashTags: {
                  has: searchTerm,
                },
              },
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

      const posts = await ctx.db.post.findMany({
        take: limit + 1,
        where: whereCondition,
        cursor: cursor ? { postId: cursor } : undefined,
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
      if (posts.length > limit) {
        const nextItem = posts.pop();
        nextCursor = nextItem?.postId;
      }

      return {
        items: posts,
        nextCursor,
      };
    }),

  // ... other procedures
});