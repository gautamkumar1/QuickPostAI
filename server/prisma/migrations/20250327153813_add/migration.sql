-- CreateTable
CREATE TABLE "Tweets" (
    "id" TEXT NOT NULL,
    "content" TEXT,
    "scheduleTime" TIMESTAMP(3),
    "status" TEXT DEFAULT 'pending',
    "userId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Tweets_pkey" PRIMARY KEY ("id")
);
