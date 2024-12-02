/*
  Warnings:

  - You are about to drop the column `assignedUserId` on the `issue` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `issue` DROP FOREIGN KEY `Issue_assignedUserId_fkey`;

-- AlterTable
ALTER TABLE `issue` DROP COLUMN `assignedUserId`,
    ADD COLUMN `userId` VARCHAR(255) NULL;

-- AddForeignKey
ALTER TABLE `Issue` ADD CONSTRAINT `Issue_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
