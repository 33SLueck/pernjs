-- CreateTable
CREATE TABLE "public"."Reviews" (
    "id" SERIAL NOT NULL,
    "text" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,
    "bookId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Reviews_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."Reviews" ADD CONSTRAINT "Reviews_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "public"."Books"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
