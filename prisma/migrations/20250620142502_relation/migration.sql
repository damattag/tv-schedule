/*
  Warnings:

  - You are about to drop the column `bannerId` on the `programs` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[programId]` on the table `banners` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `programId` to the `banners` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `programs` DROP FOREIGN KEY `programs_bannerId_fkey`;

-- DropIndex
DROP INDEX `programs_bannerId_key` ON `programs`;

-- AlterTable
ALTER TABLE `banners` ADD COLUMN `programId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `programs` DROP COLUMN `bannerId`;

-- CreateIndex
CREATE UNIQUE INDEX `banners_programId_key` ON `banners`(`programId`);

-- AddForeignKey
ALTER TABLE `banners` ADD CONSTRAINT `banners_programId_fkey` FOREIGN KEY (`programId`) REFERENCES `programs`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
