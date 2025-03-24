-- AlterTable
ALTER TABLE "Posts" ADD COLUMN     "summary" TEXT,
ADD COLUMN     "totalThreads" INTEGER,
ADD COLUMN     "tweets" JSONB;
