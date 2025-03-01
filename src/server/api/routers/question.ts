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


    getAllQuestions: publicProcedure
        .query(async ({ ctx }) => {
            try {
                return await ctx.db.question.findMany()
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
        })
})