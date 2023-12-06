-- DropForeignKey
ALTER TABLE "RateioWhiteList" DROP CONSTRAINT "RateioWhiteList_rateio_id_fkey";

-- DropForeignKey
ALTER TABLE "RateioWhiteList" DROP CONSTRAINT "RateioWhiteList_user_id_fkey";

-- AddForeignKey
ALTER TABLE "RateioWhiteList" ADD CONSTRAINT "RateioWhiteList_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RateioWhiteList" ADD CONSTRAINT "RateioWhiteList_rateio_id_fkey" FOREIGN KEY ("rateio_id") REFERENCES "Rateio"("id") ON DELETE CASCADE ON UPDATE CASCADE;
