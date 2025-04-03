-- CreateTable
CREATE TABLE "CodeSnippet" (
    "snippetId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "code" TEXT NOT NULL,
    "language" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "tags" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CodeSnippet_pkey" PRIMARY KEY ("snippetId")
);

-- CreateTable
CREATE TABLE "SnippetLike" (
    "id" TEXT NOT NULL,
    "snippetId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SnippetLike_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SnippetComment" (
    "id" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "snippetId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SnippetComment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SnippetView" (
    "id" TEXT NOT NULL,
    "snippetId" TEXT NOT NULL,
    "viewerId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SnippetView_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "SnippetLike_snippetId_userId_key" ON "SnippetLike"("snippetId", "userId");

-- CreateIndex
CREATE UNIQUE INDEX "SnippetView_snippetId_viewerId_key" ON "SnippetView"("snippetId", "viewerId");

-- AddForeignKey
ALTER TABLE "CodeSnippet" ADD CONSTRAINT "CodeSnippet_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SnippetLike" ADD CONSTRAINT "SnippetLike_snippetId_fkey" FOREIGN KEY ("snippetId") REFERENCES "CodeSnippet"("snippetId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SnippetLike" ADD CONSTRAINT "SnippetLike_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SnippetComment" ADD CONSTRAINT "SnippetComment_snippetId_fkey" FOREIGN KEY ("snippetId") REFERENCES "CodeSnippet"("snippetId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SnippetComment" ADD CONSTRAINT "SnippetComment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SnippetView" ADD CONSTRAINT "SnippetView_snippetId_fkey" FOREIGN KEY ("snippetId") REFERENCES "CodeSnippet"("snippetId") ON DELETE CASCADE ON UPDATE CASCADE;
