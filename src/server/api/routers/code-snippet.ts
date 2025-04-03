import { z } from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";
import { TRPCClientError } from "@trpc/client";
import { TRPCError } from "@trpc/server";

export const snippetRouter = createTRPCRouter({
  // Create a new code snippet
  createSnippet: protectedProcedure
    .input(z.object({
      title: z.string().min(1, { message: "Title is required" }),
      description: z.string().optional(),
      code: z.string().min(1, { message: "Code snippet is required" }),
      language: z.string().min(1, { message: "Programming language is required" }),
      tags: z.array(z.string()).max(10, 'Maximum 10 tags allowed').optional(),
    }))
    .mutation(async ({ ctx, input }) => {
      try {
        return await ctx.db.codeSnippet.create({
          data: {
            title: input.title,
            description: input.description ?? "",
            code: input.code,
            language: input.language,
            tags: input.tags ?? [],
            userId: ctx.session.user.id
          }
        });
      } catch (error) {
        if (error instanceof TRPCClientError) {
          console.error(error.message);
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: error.message
          });
        }
        console.error(error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: 'Something went wrong'
        });
      }
    }),

  // Get a snippet by ID
  getSnippetById: publicProcedure
    .input(z.object({ snippetId: z.string() }))
    .query(async ({ ctx, input }) => {
      try {
        return await ctx.db.codeSnippet.findUniqueOrThrow({
          where: { snippetId: input.snippetId },
          include: {
            user: {
              select: {
                userId: true,
                userName: true,
                image: true,
              }
            },
            _count: {
              select: {
                likes: true,
                comments: true,
              },
            },
          }
        });
      } catch (error) {
        if (error instanceof TRPCClientError) {
          console.error(error.message);
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: error.message
          });
        }
        console.error(error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: 'Code snippet not found'
        });
      }
    }),

  // Get infinite snippets with cursor-based pagination
  getInfiniteSnippets: publicProcedure
    .input(
      z.object({
        limit: z.number().min(1).max(100).default(10),
        cursor: z.string().nullish(),
        filter: z.object({
          tag: z.string().optional(),
          language: z.string().optional(), 
          userId: z.string().optional(),
        }).optional(),
      })
    )
    .query(async ({ ctx, input }) => {
      const { limit, cursor, filter } = input;
      
      // Build the where clause
      const where = {
        ...(filter?.tag ? { tags: { has: filter.tag } } : {}),
        ...(filter?.language ? { language: filter.language } : {}),
        ...(filter?.userId ? { userId: filter.userId } : {}),
      };

      try {
        // Get one more item than requested to check if there are more items
        const items = await ctx.db.codeSnippet.findMany({
          take: limit + 1,
          cursor: cursor ? { snippetId: cursor } : undefined,
          where,
          orderBy: { createdAt: 'desc' },
          include: {
            user: {
              select: {
                userId: true,
                userName: true,
              }
            },
            _count: {
              select: {
                likes: true,
                comments: true,
              },
            },
          },
        });

        // Check if there are more items
        let nextCursor: typeof cursor = undefined;
        
        if (items.length > limit) {
          // Remove the extra item
          const nextItem = items.pop();
          nextCursor = nextItem?.snippetId;
        }

        return {
          items,
          nextCursor,
        };
      } catch (error) {
        if (error instanceof TRPCClientError) {
          console.error(error.message);
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: error.message
          });
        }
        console.error(error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: 'Failed to fetch code snippets'
        });
      }
    }),

  // Like a snippet
  likeSnippet: protectedProcedure
    .input(z.object({ snippetId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      try {
        // Check if the user has already liked the snippet
        const existingLike = await ctx.db.snippetLike.findFirst({
          where: {
            snippetId: input.snippetId,
            userId: ctx.session.user.id
          }
        });

        if (existingLike) {
          // If already liked, remove the like
          return await ctx.db.snippetLike.delete({
            where: {
              id: existingLike.id
            }
          });
        } else {
          // If not liked, create a new like
          return await ctx.db.snippetLike.create({
            data: {
              snippetId: input.snippetId,
              userId: ctx.session.user.id
            }
          });
        }
      } catch (error) {
        if (error instanceof TRPCClientError) {
          console.error(error.message);
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: error.message
          });
        }
        console.error(error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: 'Failed to like code snippet'
        });
      }
    }),

  // Get all snippets liked by current user
  getLikedSnippetsByMe: protectedProcedure
    .query(async ({ ctx }) => {
      try {
        return await ctx.db.snippetLike.findMany({
          where: {
            userId: ctx.session.user.id
          },
          select: {
            snippetId: true
          }
        });
      } catch (error) {
        if (error instanceof TRPCClientError) {
          console.error(error.message);
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: error.message
          });
        }
        console.error(error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: 'Failed to fetch liked snippets'
        });
      }
    }),

  // Delete a snippet
  deleteSnippet: protectedProcedure
    .input(z.object({ snippetId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      try {
        // Verify snippet ownership
        const snippet = await ctx.db.codeSnippet.findUnique({
          where: { snippetId: input.snippetId },
          select: { userId: true }
        });

        if (!snippet) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "Code snippet not found"
          });
        }

        if (snippet.userId !== ctx.session.user.id) {
          throw new TRPCError({
            code: "FORBIDDEN",
            message: "You don't have permission to delete this code snippet"
          });
        }

        return await ctx.db.codeSnippet.delete({
          where: { snippetId: input.snippetId }
        });
      } catch (error) {
        if (error instanceof TRPCError) {
          throw error;
        }
        
        console.error(error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: 'Failed to delete code snippet'
        });
      }
    }),

  // Add a comment to a snippet
  addComment: protectedProcedure
    .input(z.object({
      snippetId: z.string(),
      content: z.string().min(1, { message: "Comment cannot be empty" }),
    }))
    .mutation(async ({ ctx, input }) => {
      try {
        return await ctx.db.snippetComment.create({
          data: {
            content: input.content,
            snippetId: input.snippetId,
            userId: ctx.session.user.id
          }
        });
      } catch (error) {
        if (error instanceof TRPCClientError) {
          console.error(error.message);
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: error.message
          });
        }
        console.error(error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: 'Failed to add comment'
        });
      }
    }),

  // Get comments for a snippet
  getCommentsBySnippetId: publicProcedure
    .input(z.object({
      snippetId: z.string(),
      limit: z.number().min(1).max(100).default(10),
      cursor: z.string().nullish(),
    }))
    .query(async ({ ctx, input }) => {
      const { snippetId, limit, cursor } = input;
      
      try {
        const items = await ctx.db.snippetComment.findMany({
          take: limit + 1,
          cursor: cursor ? { id: cursor } : undefined,
          where: { snippetId },
          orderBy: { createdAt: 'desc' },
          include: {
            user: {
              select: {
                userId: true,
                userName: true,
              }
            },
          },
        });

        let nextCursor: typeof cursor = undefined;
        
        if (items.length > limit) {
          const nextItem = items.pop();
          nextCursor = nextItem?.id;
        }

        return {
          items,
          nextCursor,
        };
      } catch (error) {
        if (error instanceof TRPCClientError) {
          console.error(error.message);
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: error.message
          });
        }
        console.error(error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: 'Failed to fetch comments'
        });
      }
    }),

  // Track snippet view
  trackSnippetView: publicProcedure
    .input(z.object({ snippetId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      try {
        // Check if the snippet exists
        const snippet = await ctx.db.codeSnippet.findUnique({
          where: { snippetId: input.snippetId }
        });

        if (!snippet) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "Code snippet not found"
          });
        }

        // Create a SnippetView entry
        const viewerId = ctx.session?.user.id ?? 'anonymous';
        
        return await ctx.db.snippetView.create({
          data: {
            snippetId: input.snippetId,
            viewerId
          }
        });
      } catch (error) {
        if (error instanceof TRPCClientError) {
          console.error(error.message);
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: error.message
          });
        }
        console.error(error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: 'Failed to track view'
        });
      }
    }),
});