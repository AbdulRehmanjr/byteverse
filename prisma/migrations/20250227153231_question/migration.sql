-- CreateTable
CREATE TABLE "Question" (
    "questionId" TEXT NOT NULL,
    "title" TEXT NOT NULL DEFAULT 'none',
    "content" TEXT NOT NULL DEFAULT 'none',
    "tags" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "userId" TEXT NOT NULL,

    CONSTRAINT "Question_pkey" PRIMARY KEY ("questionId")
);

-- AddForeignKey
ALTER TABLE "Question" ADD CONSTRAINT "Question_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE CASCADE ON UPDATE CASCADE;
