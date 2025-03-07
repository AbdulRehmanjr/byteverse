import { TRPCClientError } from "@trpc/client";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";


export const answerRouter = createTRPCRouter({
    addAnswer: protectedProcedure
        .input(z.object({
            questionId: z.string(),
            content: z.string(),
        }))
        .mutation(async ({ ctx, input }) => {
            try {

                await ctx.db.answer.create({
                    data: {
                        questionId: input.questionId,
                        content: input.content,
                        userId: ctx.session.user.id
                    }
                })
            } catch (error) {
                if (error instanceof TRPCClientError) {
                    console.error(error.message)
                    throw new TRPCError({
                        code: "INTERNAL_SERVER_ERROR",
                        message: error.message
                    })
                }
                console.error(error)
                throw new TRPCError({
                    code: "INTERNAL_SERVER_ERROR",
                    message: 'Something went wrong'
                })
            }
        }),

    getAnswersByQuestionId: publicProcedure
        .input(
            z.object({
                questionId: z.string(),
                limit: z.number().min(1).max(100).optional().default(10),
                skip: z.number().min(0).optional().default(0),
            })
        )
        .query(async ({ ctx, input }) => {

            try {
                const { questionId, limit, skip } = input;

                // Get responses for a question with pagination
                const responses = await ctx.db.answer.findMany({
                    where: {
                        questionId,
                    },
                    include: {
                        user: {
                            select: {
                                userName: true,
                            },
                        },
                    },
                    orderBy: {
                        createdAt: "desc",
                    },
                    take: limit,
                    skip,
                });

                // Get total count for pagination
                const totalCount = await ctx.db.answer.count({
                    where: {
                        questionId,
                    },
                });

                return {
                    items: responses,
                    totalCount,
                };
            } catch (error) {
                if (error instanceof TRPCClientError) {
                    console.error(error.message)
                    throw new TRPCError({
                        code: "INTERNAL_SERVER_ERROR",
                        message: error.message
                    })
                }
                console.error(error)
                throw new TRPCError({
                    code: "INTERNAL_SERVER_ERROR",
                    message: 'Something went wrong'
                })
            }

        }),

})