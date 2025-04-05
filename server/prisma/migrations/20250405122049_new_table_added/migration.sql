-- CreateTable
CREATE TABLE "CreatedPosts" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER,
    "post" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CreatedPosts_pkey" PRIMARY KEY ("id")
);
