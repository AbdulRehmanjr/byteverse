import { createCallerFactory, createTRPCRouter } from "~/server/api/trpc";
import { registerRouter } from "~/server/api/routers/register";
import { questionRouter } from "~/server/api/routers/question";
import { answerRouter } from "~/server/api/routers/answer";

export const appRouter = createTRPCRouter({
  register:registerRouter,
  question:questionRouter,
  answer : answerRouter
});

export type AppRouter = typeof appRouter;

export const createCaller = createCallerFactory(appRouter);