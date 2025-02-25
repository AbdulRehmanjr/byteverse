import { z } from 'zod';
import { createTRPCRouter, publicProcedure } from "../trpc";
import { bcrypt } from 'bcrypt';
import { hash } from 'bcrypt';
export const registerRouter = createTRPCRouter({
    addUser:publicProcedure.input(z.object({
        email:z.string(),
        password:z.string()
    }))
    .mutation(async({ctx,input}) =>
    {
        try{
            const hashedpassword = await bcrypt.hash(input.password,10)
            await ctx.db.user.create({
                data:{
                    email:input.email,
                    password:hashedpassword
                }
            })
        }catch (error) {
            console.error(error)
            throw new Error("Something went wrong")
        }
    })
})