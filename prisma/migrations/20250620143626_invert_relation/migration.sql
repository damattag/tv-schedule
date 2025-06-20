/*
  Warnings:

  - You are about to drop the column `programId` on the `banners` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[bannerId]` on the table `programs` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE `banners` DROP FOREIGN KEY `banners_programId_fkey`;

-- DropIndex
DROP INDEX `banners_programId_key` ON `banners`;

-- AlterTable
ALTER TABLE `banners` DROP COLUMN `programId`;

-- AlterTable
ALTER TABLE `programs` ADD COLUMN `bannerId` VARCHAR(191) NULL;

-- CreateIndex
CREATE UNIQUE INDEX `programs_bannerId_key` ON `programs`(`bannerId`);

-- AddForeignKey
ALTER TABLE `programs` ADD CONSTRAINT `programs_bannerId_fkey` FOREIGN KEY (`bannerId`) REFERENCES `banners`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
