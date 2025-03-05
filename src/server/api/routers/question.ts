import { z } from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";
import { TRPCClientError } from "@trpc/client";
import { TRPCError } from "@trpc/server";

export const questionRouter = createTRPCRouter({

    addQuestion: protectedProcedure
        .input(z.object({
            title: z.string().min(8, { message: "Question title too short" }),
            details: z.string().min(20, {
                message: "Please provide at least 20 characters describing your problem",
            }),
            tags: z.array(z.string()).min(1, "At least one tag is required").max(5, 'Maximum 5 tags allowed'),
        }))
        .mutation(async ({ ctx, input }) => {
            try {

                await ctx.db.question.create({
                    data: {
                        title: input.title,
                        content: input.details,
                        tags: input.tags,
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

    getQuestionById: publicProcedure
        .input(z.object({ questionId: z.string() }))
        .query(async ({ ctx, input }) => {
            try {
                return await ctx.db.question.findUniqueOrThrow({
                    where: { questionId: input.questionId },
                    include: {
                        _count: {
                            select: {
                                QuestionLike: true,
                            },
                        },
                        user : {
                            select :{
                                email : true
                            }
                        }
                    }
                })
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

    getAllQuestions: publicProcedure
        .input(
            z.object({
                limit: z.number().min(1).max(100).default(10),
                skip: z.number().optional(),
            })
        )
        .query(async ({ ctx, input }) => {
            const { limit, skip } = input;

            try {
                const items = await ctx.db.question.findMany({
                    take: limit,
                    skip: skip ?? 0,
                    orderBy: { createdAt: 'desc' },
                    include: {
                        _count: {
                            select: {
                                QuestionLike: true,
                            },
                        },
                    },
                });

                // Transform the data for the frontend
                const transformedItems = items.map((item) => ({
                    ...item,
                    likeCount: item._count.QuestionLike,
                }));

                return {
                    items: transformedItems,
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
                    message: 'Something went wrong'
                });
            }
        }),

    getQuestionCount: publicProcedure.query(async ({ ctx }) => {
        try {
            return await ctx.db.question.count();
        } catch (error) {
            console.error(error);
            throw new TRPCError({
                code: "INTERNAL_SERVER_ERROR",
                message: 'Failed to get question count'
            });
        }
    }),

    likeQuestion: protectedProcedure
        .input(z.object({ questionId: z.string() }))
        .mutation(async ({ ctx, input }) => {
            try {
                await ctx.db.questionLike.create({
                    data: {
                        questionId: input.questionId,
                        userId: ctx.session.user.id
                    }
                })
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

    checklikeQuestion: protectedProcedure
        .input(z.object({ questionId: z.string() }))
        .query(async ({ ctx, input }) => {
            try {
                const data = await ctx.db.questionLike.findUnique({
                    where: {
                        userId_questionId: {
                            questionId: input.questionId,
                            userId: ctx.session.user.id
                        }
                    }
                })
                if (data) return true
                return false
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

})