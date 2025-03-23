/*
  Warnings:

  - You are about to drop the column `guestId` on the `Conversation` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Conversation` table. All the data in the column will be lost.
  - You are about to drop the column `userName` on the `Conversation` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[senderId]` on the table `Conversation` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[receiverId]` on the table `Conversation` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `receiverId` to the `Conversation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `senderId` to the `Conversation` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Conversation" DROP CONSTRAINT "Conversation_guestId_fkey";

-- DropForeignKey
ALTER TABLE "Conversation" DROP CONSTRAINT "Conversation_userId_fkey";

-- DropIndex
DROP INDEX "Conversation_guestId_idx";

-- DropIndex
DROP INDEX "Conversation_userId_idx";

-- AlterTable
ALTER TABLE "Conversation" DROP COLUMN "guestId",
DROP COLUMN "userId",
DROP COLUMN "userName",
ADD COLUMN     "receiverId" TEXT NOT NULL,
ADD COLUMN     "senderId" TEXT NOT NULL,
ADD COLUMN     "senderName" TEXT NOT NULL DEFAULT 'none';

-- CreateIndex
CREATE UNIQUE INDEX "Conversation_senderId_key" ON "Conversation"("senderId");

-- CreateIndex
CREATE UNIQUE INDEX "Conversation_receiverId_key" ON "Conversation"("receiverId");

-- CreateIndex
CREATE INDEX "Conversation_senderId_idx" ON "Conversation"("senderId");

-- CreateIndex
CREATE INDEX "Conversation_receiverId_idx" ON "Conversation"("receiverId");

-- AddForeignKey
ALTER TABLE "Conversation" ADD CONSTRAINT "Conversation_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES "User"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Conversation" ADD CONSTRAINT "Conversation_receiverId_fkey" FOREIGN KEY ("receiverId") REFERENCES "User"("userId") ON DELETE CASCADE ON UPDATE CASCADE;
