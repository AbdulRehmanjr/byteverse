

import { createCallerFactory, createTRPCRouter } from "~/server/api/trpc";
import { registerRouter } from "~/server/api/routers/register";


export const appRouter = createTRPCRouter({
  //
  // This is a placeholder for your API routes.
  register: registerRouter,
});

export type AppRouter = typeof appRouter;

export const createCaller = createCallerFactory(appRouter);