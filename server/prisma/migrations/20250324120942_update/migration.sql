/*
  Warnings:

  - You are about to drop the column `summary` on the `Posts` table. All the data in the column will be lost.
  - You are about to drop the column `totalThreads` on the `Posts` table. All the data in the column will be lost.
  - You are about to drop the column `tweets` on the `Posts` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Posts" DROP COLUMN "summary",
DROP COLUMN "totalThreads",
DROP COLUMN "tweets",
ALTER COLUMN "postUrl" DROP NOT NULL;
