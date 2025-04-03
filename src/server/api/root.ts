import { createCallerFactory, createTRPCRouter } from "~/server/api/trpc";
import { registerRouter } from "~/server/api/routers/register";
import { questionRouter } from "~/server/api/routers/question";
import { answerRouter } from "~/server/api/routers/answer";
import { userRouter } from "~/server/api/routers/user";
import { profileRouter } from "~/server/api/routers/profile";
import { conversationRouter } from "~/server/api/routers/converstaion";
import { messageRouter } from "~/server/api/routers/message";
import { postRouter } from "~/server/api/routers/post";
import { snippetRouter } from "~/server/api/routers/code-snippet";

export const appRouter = createTRPCRouter({
  register:registerRouter,
  question:questionRouter,
  answer : answerRouter,
  user:userRouter,
  profile:profileRouter,
  conversation: conversationRouter,
  message: messageRouter,
  post : postRouter,
  snippet : snippetRouter,
});

export type AppRouter = typeof appRouter;

export const createCaller = createCallerFactory(appRouter);