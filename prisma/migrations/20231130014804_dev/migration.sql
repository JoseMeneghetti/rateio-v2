/*
  Warnings:

  - Added the required column `participants` to the `Rateio` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Rateio" ADD COLUMN     "participants" TEXT NOT NULL;
