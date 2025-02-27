import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { hash } from 'bcrypt'
<<<<<<< HEAD
=======

>>>>>>> ceb7d077fb955143dc32fe9363980749b35cc9f3
export const registerRouter = createTRPCRouter({

    addUser: publicProcedure
        .input(z.object({
            email: z.string(),
            password: z.string()
        }))
        .mutation(async ({ ctx, input }) => {
            try {
                const hashPassword = await hash(input.password, 10)
                await ctx.db.user.create({
                    data: {
                        email: input.email,
                        password: hashPassword
                    }
                })
            } catch (error) {
                console.error(error)
                throw new Error("Something went wrong")
            }
<<<<<<< HEAD
        }),
=======
        }),
>>>>>>> ceb7d077fb955143dc32fe9363980749b35cc9f3
})