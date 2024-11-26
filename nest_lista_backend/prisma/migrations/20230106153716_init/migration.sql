/*
  Warnings:

  - A unique constraint covering the columns `[nome]` on the table `Evento` will be added. If there are existing duplicate values, this will fail.
  - Made the column `description` on table `media` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `media` MODIFY `description` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Evento_nome_key` ON `Evento`(`nome`);
