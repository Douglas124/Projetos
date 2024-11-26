/*
  Warnings:

  - A unique constraint covering the columns `[id]` on the table `Evento` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `Usuario` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Evento_id_key` ON `Evento`(`id`);

-- CreateIndex
CREATE UNIQUE INDEX `Usuario_id_key` ON `Usuario`(`id`);
