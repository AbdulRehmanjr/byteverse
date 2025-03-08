import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { hash } from 'bcrypt'
export const registerRouter = createTRPCRouter({

    addUser: publicProcedure
        .input(z.object({
            email: z.string(),
            password: z.string(),
            userName: z.string()
        }))
        .mutation(async ({ ctx, input }) => {
            try {
                const hashPassword = await hash(input.password, 10)
                await ctx.db.user.create({
                    data: {
                        userName: input.userName,
                        email: input.email,
                        password: hashPassword
                    }
                })
            } catch (error) {
                console.error(error)
                throw new Error("Something went wrong")
            }
        }),
})