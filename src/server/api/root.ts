import { createCallerFactory, createTRPCRouter } from "~/server/api/trpc";
<<<<<<< HEAD
import {registerRouter} from "~/server/api/routers/register";


export const appRouter = createTRPCRouter({
    register:registerRouter
  //
=======
import { registerRouter } from "~/server/api/routers/register";
import { questionRouter } from "~/server/api/routers/question";


export const appRouter = createTRPCRouter({
  register:registerRouter,
  question:questionRouter,
>>>>>>> ceb7d077fb955143dc32fe9363980749b35cc9f3
});

export type AppRouter = typeof appRouter;

export const createCaller = createCallerFactory(appRouter);