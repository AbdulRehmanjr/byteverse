import { z } from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "~/server/api/trpc";
import { TRPCError } from "@trpc/server";
import { TRPCClientError } from "@trpc/client";

export const conversationRouter = createTRPCRouter({
    initializeConversation: publicProcedure
        .input(z.object({
            senderId: z.string(),
            receiverId: z.string(),
            senderName: z.string()
        }))
        .mutation(async ({ ctx, input }) => {
            try {
                const conversation = await ctx.db.conversation.upsert({
                    where: {
                        senderId: input.senderId,
                        receiverId: input.receiverId
                    },
                    update: {
                        senderName: input.senderName
                    },
                    create: {
                        senderId: input.senderId,
                        receiverId: input.receiverId,
                        senderName: input.senderName
                    },
                });

                return conversation;
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

    // Get conversation by ID
    getConversation: publicProcedure
        .input(z.object({ conversationId: z.string() }))
        .query(async ({ ctx, input }) => {
            const conversation = await ctx.db.conversation.findUnique({
                where: {
                    conversationId: input.conversationId,
                },
                include: {
                    sender: true,
                    receiver: true,
                },
            });

            if (!conversation) {
                throw new TRPCError({
                    code: "NOT_FOUND",
                    message: "Conversation not found",
                });
            }

            return conversation;
        }),

    // Get all conversations for a hotel or guest
    getConversations: protectedProcedure
        .query(async ({ ctx }) => {
            const conversations = await ctx.db.conversation.findMany({
                where: {
                    OR: [
                        { senderId: ctx.session.user.id },
                        { receiverId: ctx.session.user.id }
                    ]
                },
                orderBy: {
                    updatedAt: "desc",
                },
                include: {
                    sender: true,
                    receiver: true,
                    messages: {
                        take: 1,
                        orderBy: {
                            createdAt: "desc",
                        },
                    },
                },
            });

            return conversations;
        }),
});

