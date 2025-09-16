-- CreateEnum
CREATE TYPE "public"."Genre" AS ENUM ('SCIENCE_FICTION', 'FANTASY', 'MYSTERY', 'THRILLER', 'ROMANCE', 'WESTERN', 'DYSTOPIAN', 'CONTEMPORARY');

-- CreateTable
CREATE TABLE "public"."Books" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "genre" "public"."Genre" NOT NULL,
    "isbn" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Books_pkey" PRIMARY KEY ("id")
);
