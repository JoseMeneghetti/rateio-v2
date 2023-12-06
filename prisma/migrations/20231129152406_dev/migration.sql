/*
  Warnings:

  - The primary key for the `Rateio` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "Rateio" DROP CONSTRAINT "Rateio_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Rateio_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Rateio_id_seq";

-- CreateTable
CREATE TABLE "RateioWhiteList" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "rateio_id" TEXT NOT NULL,

    CONSTRAINT "RateioWhiteList_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "RateioWhiteList_user_id_rateio_id_key" ON "RateioWhiteList"("user_id", "rateio_id");

-- AddForeignKey
ALTER TABLE "RateioWhiteList" ADD CONSTRAINT "RateioWhiteList_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RateioWhiteList" ADD CONSTRAINT "RateioWhiteList_rateio_id_fkey" FOREIGN KEY ("rateio_id") REFERENCES "Rateio"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
