import { TRPCError } from "@trpc/server";
import { z } from "zod";

import {
    createTRPCRouter,
    publicProcedure,
} from "~/server/api/trpc";

export const taskRouter = createTRPCRouter({

    createTask: publicProcedure
        .input(z.object({
            title: z.string({ required_error: "Title is required." }),
            description: z.string({ required_error: "Description is required." }),
        }))
        .mutation(async ({ ctx, input }) => {
            try {
                await ctx.db.task.create({
                    data: {
                        title: input.title,
                        description: input.description
                    }
                })
            } catch (error) {

                console.log(error)
                throw new TRPCError({
                    code: 'INTERNAL_SERVER_ERROR',
                    message: 'SOmething went wrong'
                })
            }

        }),

    getTasks: publicProcedure
        .query(async ({ ctx, input }) => {
            try {
                const tasks = await ctx.db.task.findMany()
                return tasks
            } catch (error) {

                console.log(error)
                throw new TRPCError({
                    code: 'INTERNAL_SERVER_ERROR',
                    message: 'SOmething went wrong'
                })
            }

        })
});
