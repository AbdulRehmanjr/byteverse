import { TRPCClientError } from "@trpc/client";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { TRPCError } from "@trpc/server";



export const userRouter = createTRPCRouter({

    getStats: publicProcedure
        .query(async ({ ctx }) => {
            try {

                const [userCount, questionCount] = await Promise.all([
                    ctx.db.user.count(),
                    ctx.db.question.count()
                ])

                return { userCount, questionCount }

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
        })
})