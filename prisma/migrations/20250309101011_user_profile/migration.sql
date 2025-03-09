/*
  Warnings:

  - A unique constraint covering the columns `[userName]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "User" ALTER COLUMN "userName" DROP DEFAULT;

-- CreateTable
CREATE TABLE "UserProfile" (
    "profileId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "bio" TEXT,
    "role" TEXT,
    "company" TEXT,
    "location" TEXT,
    "githubUrl" TEXT,
    "websiteUrl" TEXT,
    "tags" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "isVerified" BOOLEAN NOT NULL DEFAULT false,
    "isTopContributor" BOOLEAN NOT NULL DEFAULT false,
    "receiveNotifications" BOOLEAN NOT NULL DEFAULT true,
    "showEmail" BOOLEAN NOT NULL DEFAULT false,
    "reputation" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserProfile_pkey" PRIMARY KEY ("profileId")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserProfile_userId_key" ON "UserProfile"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "User_userName_key" ON "User"("userName");

-- AddForeignKey
ALTER TABLE "UserProfile" ADD CONSTRAINT "UserProfile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE CASCADE ON UPDATE CASCADE;
