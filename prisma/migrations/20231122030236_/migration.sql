/*
  Warnings:

  - You are about to drop the `Result` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Result";

-- CreateTable
CREATE TABLE "Rateio" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "nameRateio" TEXT NOT NULL,
    "whoPaid" TEXT NOT NULL,
    "listForResult" TEXT NOT NULL,
    "onlyParticipants" TEXT NOT NULL,
    "sumOfPaids" TEXT NOT NULL,
    "total" TEXT NOT NULL,
    "suggestion" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Rateio_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Rateio" ADD CONSTRAINT "Rateio_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
