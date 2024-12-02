import { postRouter } from "~/server/api/routers/post";
import { createCallerFactory, createTRPCRouter } from "~/server/api/trpc";
import { taskRouter } from "~/server/api/routers/task";


export const appRouter = createTRPCRouter({
  post: postRouter,
  task:taskRouter,
});

export type AppRouter = typeof appRouter;

export const createCaller = createCallerFactory(appRouter);