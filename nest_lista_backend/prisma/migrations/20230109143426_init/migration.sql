/*
  Warnings:

  - Made the column `userId` on table `evento` required. This step will fail if there are existing NULL values in that column.
  - Made the column `eventId` on table `media` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `evento` DROP FOREIGN KEY `Evento_userId_fkey`;

-- DropForeignKey
ALTER TABLE `media` DROP FOREIGN KEY `Media_eventId_fkey`;

-- AlterTable
ALTER TABLE `evento` MODIFY `userId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `media` MODIFY `description` VARCHAR(191) NULL,
    MODIFY `eventId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Evento` ADD CONSTRAINT `Evento_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `Usuario`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Media` ADD CONSTRAINT `Media_eventId_fkey` FOREIGN KEY (`eventId`) REFERENCES `Evento`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
