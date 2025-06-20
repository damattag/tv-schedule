-- DropForeignKey
ALTER TABLE `programs` DROP FOREIGN KEY `programs_bannerId_fkey`;

-- AddForeignKey
ALTER TABLE `programs` ADD CONSTRAINT `programs_bannerId_fkey` FOREIGN KEY (`bannerId`) REFERENCES `banners`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
