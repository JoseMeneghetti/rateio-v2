/*
  Warnings:

  - You are about to drop the `ListForResult` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `OnlyParticipants` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `SuggestionItem` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `SuggestionItemPay` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `SuggestionItemReceive` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `SumOfPaids` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Total` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `WhoPaid` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `WhoPaidNames` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `listForResult` to the `Result` table without a default value. This is not possible if the table is not empty.
  - Added the required column `onlyParticipants` to the `Result` table without a default value. This is not possible if the table is not empty.
  - Added the required column `suggestion` to the `Result` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sumOfPaids` to the `Result` table without a default value. This is not possible if the table is not empty.
  - Added the required column `total` to the `Result` table without a default value. This is not possible if the table is not empty.
  - Added the required column `whoPaid` to the `Result` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ListForResult" DROP CONSTRAINT "ListForResult_resultId_fkey";

-- DropForeignKey
ALTER TABLE "OnlyParticipants" DROP CONSTRAINT "OnlyParticipants_resultId_fkey";

-- DropForeignKey
ALTER TABLE "SuggestionItem" DROP CONSTRAINT "SuggestionItem_resultId_fkey";

-- DropForeignKey
ALTER TABLE "SuggestionItemPay" DROP CONSTRAINT "SuggestionItemPay_suggestionItemId_fkey";

-- DropForeignKey
ALTER TABLE "SuggestionItemReceive" DROP CONSTRAINT "SuggestionItemReceive_suggestionItemId_fkey";

-- DropForeignKey
ALTER TABLE "SumOfPaids" DROP CONSTRAINT "SumOfPaids_resultId_fkey";

-- DropForeignKey
ALTER TABLE "Total" DROP CONSTRAINT "Total_resultId_fkey";

-- DropForeignKey
ALTER TABLE "WhoPaid" DROP CONSTRAINT "WhoPaid_resultId_fkey";

-- DropForeignKey
ALTER TABLE "WhoPaidNames" DROP CONSTRAINT "WhoPaidNames_whoPaidId_fkey";

-- AlterTable
ALTER TABLE "Result" ADD COLUMN     "listForResult" TEXT NOT NULL,
ADD COLUMN     "onlyParticipants" TEXT NOT NULL,
ADD COLUMN     "suggestion" TEXT NOT NULL,
ADD COLUMN     "sumOfPaids" TEXT NOT NULL,
ADD COLUMN     "total" TEXT NOT NULL,
ADD COLUMN     "whoPaid" TEXT NOT NULL;

-- DropTable
DROP TABLE "ListForResult";

-- DropTable
DROP TABLE "OnlyParticipants";

-- DropTable
DROP TABLE "SuggestionItem";

-- DropTable
DROP TABLE "SuggestionItemPay";

-- DropTable
DROP TABLE "SuggestionItemReceive";

-- DropTable
DROP TABLE "SumOfPaids";

-- DropTable
DROP TABLE "Total";

-- DropTable
DROP TABLE "WhoPaid";

-- DropTable
DROP TABLE "WhoPaidNames";
