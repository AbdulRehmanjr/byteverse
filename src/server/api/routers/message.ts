import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { TRPCError } from "@trpc/server";
import { decryptMessage } from "~/utils/encryption";
import { serverPusher } from "~/lib/pusher";
import { TRPCClientError } from "@trpc/client";

export const messageRouter = createTRPCRouter({
  sendMessage: publicProcedure
    .input(z.object({
      conversationId: z.string(),
      content: z.string().min(1),
      senderId: z.string(),
    }))
    .mutation(async ({ ctx, input }) => {
      try {

        const [message] = await Promise.all([
          ctx.db.message.create({
            data: {
              conversationId: input.conversationId,
              content: input.content,
              senderId: input.senderId,
            },
          }),
          ctx.db.conversation.update({
            where: { conversationId: input.conversationId },
            data: {
              lastMessage: input.content,
              updatedAt: new Date(),
            },
          })
        ])

        await serverPusher.trigger(`private-conversation-${input.conversationId}`, 'new-message', {
          messageId: message.messageId, 
          message: input.content,
          senderId: input.senderId,
          timestamp: message.createdAt.getTime(), 
        });

        return {
          messageId: message.messageId,
          createdAt: message.createdAt,
        };
      } catch (error) {
        if (error instanceof TRPCClientError) {
          console.error(error);
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: error.message,
          });
        }
        console.error(error)
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to initialize conversation",
        });
      }
    }),

  getMessages: publicProcedure
    .input(z.object({
      conversationId: z.string(),
      limit: z.number().min(1).max(100).default(50),
      cursor: z.string().optional(),
    }))
    .query(async ({ ctx, input }) => {
      try {
        const messages = await ctx.db.message.findMany({
          where: {
            conversationId: input.conversationId,
          },
          take: input.limit + 1,
          cursor: input.cursor
            ? { messageId: input.cursor }
            : undefined,
          orderBy: {
            createdAt: 'asc',
          },
        });

        let nextCursor: typeof input.cursor | undefined = undefined;
        if (messages.length > input.limit) {
          const nextItem = messages.pop();
          nextCursor = nextItem?.messageId;
        }

        const decryptedMessages = messages.map(message => ({
          ...message,
          content: decryptMessage(message.content),
        }));

        return {
          messages: decryptedMessages,
          nextCursor,
        };
      } catch (error) {
        if (error instanceof TRPCClientError) {
          console.error(error);
          throw new TRPCError({
              code: "INTERNAL_SERVER_ERROR",
              message: error.message,
          });
      }
      console.error(error)
      throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to initialize conversation",
      });
      }
    }),

  markAsRead: publicProcedure
    .input(z.object({
      conversationId: z.string(),
    }))
    .mutation(async ({ ctx, input }) => {
      try {
        await ctx.db.message.updateMany({
          where: {
            conversationId: input.conversationId,
            read: false,
          },
          data: {
            read: true,
          },
        });

        return { success: true };
      } catch (error) {
        if (error instanceof TRPCClientError) {
          console.error(error);
          throw new TRPCError({
              code: "INTERNAL_SERVER_ERROR",
              message: error.message,
          });
      }
      console.error(error)
      throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to initialize conversation",
      });
      }
    }),

  getUnreadCount: publicProcedure
    .input(z.object({
      conversationId: z.string(),
    }))
    .query(async ({ ctx, input }) => {
      try {
        const count = await ctx.db.message.count({
          where: {
            conversationId: input.conversationId,
            read: false,
          },
        });

        return { count };
      } catch (error) {
        if (error instanceof TRPCClientError) {
          console.error(error);
          throw new TRPCError({
              code: "INTERNAL_SERVER_ERROR",
              message: error.message,
          });
      }
      console.error(error)
      throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to initialize conversation",
      });
      }
    }),


});