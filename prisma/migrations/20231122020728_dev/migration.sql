/*
  Warnings:

  - You are about to drop the `Account` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Session` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `VerificationToken` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Account" DROP CONSTRAINT "Account_userId_fkey";

-- DropForeignKey
ALTER TABLE "Session" DROP CONSTRAINT "Session_userId_fkey";

-- DropTable
DROP TABLE "Account";

-- DropTable
DROP TABLE "Session";

-- DropTable
DROP TABLE "VerificationToken";

-- CreateTable
CREATE TABLE "Result" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "nameRateio" TEXT NOT NULL,

    CONSTRAINT "Result_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WhoPaid" (
    "id" SERIAL NOT NULL,
    "expense" TEXT NOT NULL,
    "value" DOUBLE PRECISION NOT NULL,
    "icon" TEXT NOT NULL,
    "resultId" INTEGER,

    CONSTRAINT "WhoPaid_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ListForResult" (
    "id" SERIAL NOT NULL,
    "participant" TEXT NOT NULL,
    "expenses" DOUBLE PRECISION NOT NULL,
    "resultId" INTEGER,

    CONSTRAINT "ListForResult_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Total" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "value" DOUBLE PRECISION NOT NULL,
    "resultId" INTEGER,

    CONSTRAINT "Total_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OnlyParticipants" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "value" DOUBLE PRECISION NOT NULL,
    "resultId" INTEGER,

    CONSTRAINT "OnlyParticipants_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WhoPaidNames" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "value" DOUBLE PRECISION NOT NULL,
    "whoPaidId" INTEGER,

    CONSTRAINT "WhoPaidNames_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SumOfPaids" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "value" DOUBLE PRECISION NOT NULL,
    "resultId" INTEGER,

    CONSTRAINT "SumOfPaids_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SuggestionItem" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "value" DOUBLE PRECISION NOT NULL,
    "resultId" INTEGER,

    CONSTRAINT "SuggestionItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SuggestionItemReceive" (
    "id" SERIAL NOT NULL,
    "receiveFrom" TEXT NOT NULL,
    "receiveValue" DOUBLE PRECISION NOT NULL,
    "suggestionItemId" INTEGER,

    CONSTRAINT "SuggestionItemReceive_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SuggestionItemPay" (
    "id" SERIAL NOT NULL,
    "pays" TEXT NOT NULL,
    "payValue" DOUBLE PRECISION NOT NULL,
    "suggestionItemId" INTEGER,

    CONSTRAINT "SuggestionItemPay_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "WhoPaid" ADD CONSTRAINT "WhoPaid_resultId_fkey" FOREIGN KEY ("resultId") REFERENCES "Result"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ListForResult" ADD CONSTRAINT "ListForResult_resultId_fkey" FOREIGN KEY ("resultId") REFERENCES "Result"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Total" ADD CONSTRAINT "Total_resultId_fkey" FOREIGN KEY ("resultId") REFERENCES "Result"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OnlyParticipants" ADD CONSTRAINT "OnlyParticipants_resultId_fkey" FOREIGN KEY ("resultId") REFERENCES "Result"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WhoPaidNames" ADD CONSTRAINT "WhoPaidNames_whoPaidId_fkey" FOREIGN KEY ("whoPaidId") REFERENCES "WhoPaid"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SumOfPaids" ADD CONSTRAINT "SumOfPaids_resultId_fkey" FOREIGN KEY ("resultId") REFERENCES "Result"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SuggestionItem" ADD CONSTRAINT "SuggestionItem_resultId_fkey" FOREIGN KEY ("resultId") REFERENCES "Result"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SuggestionItemReceive" ADD CONSTRAINT "SuggestionItemReceive_suggestionItemId_fkey" FOREIGN KEY ("suggestionItemId") REFERENCES "SuggestionItem"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SuggestionItemPay" ADD CONSTRAINT "SuggestionItemPay_suggestionItemId_fkey" FOREIGN KEY ("suggestionItemId") REFERENCES "SuggestionItem"("id") ON DELETE SET NULL ON UPDATE CASCADE;
