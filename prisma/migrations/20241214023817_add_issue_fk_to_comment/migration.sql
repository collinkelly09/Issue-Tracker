/*
  Warnings:

  - Added the required column `issueId` to the `Comment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `comment` ADD COLUMN `issueId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Comment` ADD CONSTRAINT `Comment_issueId_fkey` FOREIGN KEY (`issueId`) REFERENCES `Issue`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
