/*
  Warnings:

  - You are about to drop the column `userId` on the `issue` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `issue` DROP FOREIGN KEY `Issue_userId_fkey`;

-- AlterTable
ALTER TABLE `issue` DROP COLUMN `userId`,
    ADD COLUMN `assignedUserId` VARCHAR(255) NULL;

-- AddForeignKey
ALTER TABLE `Issue` ADD CONSTRAINT `Issue_assignedUserId_fkey` FOREIGN KEY (`assignedUserId`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
