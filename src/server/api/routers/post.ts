import { z } from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";
import { TRPCClientError } from "@trpc/client";
import { TRPCError } from "@trpc/server";

export const postRouter = createTRPCRouter({
  // Create a new post
  createPost: protectedProcedure
    .input(z.object({
      content: z.string().min(1, { message: "Post content cannot be empty" }),
      image: z.string().optional(),
      hashTags: z.array(z.string()).max(10, 'Maximum 10 tags allowed').optional(),
    }))
    .mutation(async ({ ctx, input }) => {
      try {
        return await ctx.db.post.create({
          data: {
            content: input.content,
            image: input.image ?? "",
            hashTags: input.hashTags ?? [],
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

  // Get a post by ID
  getPostById: publicProcedure
    .input(z.object({ postId: z.string() }))
    .query(async ({ ctx, input }) => {
      try {
        return await ctx.db.post.findUniqueOrThrow({
          where: { postId: input.postId },
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
          message: 'Post not found'
        });
      }
    }),

  // Get infinite posts with cursor-based pagination
  getInfinitePosts: publicProcedure
    .input(
      z.object({
        limit: z.number().min(1).max(100).default(10),
        cursor: z.string().nullish(),
        filter: z.object({
          hashTag: z.string().optional(),
          userId: z.string().optional(),
        }).optional(),
      })
    )
    .query(async ({ ctx, input }) => {
      const { limit, cursor, filter } = input;
      
      // Build the where clause
      const where = {
        ...(filter?.hashTag ? { hashTags: { has: filter.hashTag } } : {}),
        ...(filter?.userId ? { userId: filter.userId } : {}),
      };

      try {
        // Get one more item than requested to check if there are more items
        const items = await ctx.db.post.findMany({
          take: limit + 1,
          cursor: cursor ? { postId: cursor } : undefined,
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
          nextCursor = nextItem?.postId;
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
          message: 'Failed to fetch posts'
        });
      }
    }),

  // Like a post
  likePost: protectedProcedure
    .input(z.object({ postId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      try {
        // Check if the user has already liked the post
        const existingLike = await ctx.db.postLike.findFirst({
          where: {
            postId: input.postId,
            userId: ctx.session.user.id
          }
        });

        if (existingLike) {
          // If already liked, remove the like
          return await ctx.db.postLike.delete({
            where: {
              id: existingLike.id
            }
          });
        } else {
          // If not liked, create a new like
          return await ctx.db.postLike.create({
            data: {
              postId: input.postId,
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
          message: 'Failed to like post'
        });
      }
    }),

  // Get all posts liked by current user
  getLikedPostsByMe: protectedProcedure
    .query(async ({ ctx }) => {
      try {
        return await ctx.db.postLike.findMany({
          where: {
            userId: ctx.session.user.id
          },
          select: {
            postId: true
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
          message: 'Failed to fetch liked posts'
        });
      }
    }),

  // Delete a post
  deletePost: protectedProcedure
    .input(z.object({ postId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      try {
        // Verify post ownership
        const post = await ctx.db.post.findUnique({
          where: { postId: input.postId },
          select: { userId: true }
        });

        if (!post) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "Post not found"
          });
        }

        if (post.userId !== ctx.session.user.id) {
          throw new TRPCError({
            code: "FORBIDDEN",
            message: "You don't have permission to delete this post"
          });
        }

        return await ctx.db.post.delete({
          where: { postId: input.postId }
        });
      } catch (error) {
        if (error instanceof TRPCError) {
          throw error;
        }
        
        console.error(error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: 'Failed to delete post'
        });
      }
    }),

  // Add a comment to a post
  addComment: protectedProcedure
    .input(z.object({
      postId: z.string(),
      content: z.string().min(1, { message: "Comment cannot be empty" }),
    }))
    .mutation(async ({ ctx, input }) => {
      try {
        return await ctx.db.comment.create({
          data: {
            content: input.content,
            postId: input.postId,
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

  // Get comments for a post
  getCommentsByPostId: publicProcedure
    .input(z.object({
      postId: z.string(),
      limit: z.number().min(1).max(100).default(10),
      cursor: z.string().nullish(),
    }))
    .query(async ({ ctx, input }) => {
      const { postId, limit, cursor } = input;
      
      try {
        const items = await ctx.db.comment.findMany({
          take: limit + 1,
          cursor: cursor ? { id: cursor } : undefined,
          where: { postId },
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

  // Track post view
  trackPostView: publicProcedure
    .input(z.object({ postId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      try {
        // Check if the post exists
        const post = await ctx.db.post.findUnique({
          where: { postId: input.postId }
        });

        if (!post) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "Post not found"
          });
        }

        // Increment view count logic - this could be implemented in various ways
        // Option 1: Direct increment if your DB schema has a viewCount field
        // return await ctx.db.post.update({
        //   where: { postId: input.postId },
        //   data: { viewCount: { increment: 1 } }
        // });

        // Option 2: Create a PostView entry (assuming you have this model)
        // This approach allows tracking unique views with additional logic if needed
        const viewerId = ctx.session?.user.id ?? 'anonymous';
        
        return await ctx.db.postView.create({
          data: {
            postId: input.postId,
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