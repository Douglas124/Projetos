-- DropForeignKey
ALTER TABLE `evento` DROP FOREIGN KEY `Evento_userId_fkey`;

-- DropForeignKey
ALTER TABLE `media` DROP FOREIGN KEY `Media_eventId_fkey`;

-- AlterTable
ALTER TABLE `evento` MODIFY `userId` INTEGER NULL;

-- AlterTable
ALTER TABLE `media` MODIFY `eventId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Evento` ADD CONSTRAINT `Evento_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `Usuario`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Media` ADD CONSTRAINT `Media_eventId_fkey` FOREIGN KEY (`eventId`) REFERENCES `Evento`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
