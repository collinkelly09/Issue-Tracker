/*
  Warnings:

  - You are about to drop the column `user_id` on the `comment` table. All the data in the column will be lost.
  - Added the required column `userId` to the `Comment` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `comment` DROP FOREIGN KEY `Comment_user_id_fkey`;

-- AlterTable
ALTER TABLE `comment` DROP COLUMN `user_id`,
    ADD COLUMN `userId` VARCHAR(255) NOT NULL;

-- AddForeignKey
ALTER TABLE `Comment` ADD CONSTRAINT `Comment_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
