/*
  Warnings:

  - Added the required column `content` to the `note` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `note` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `note` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "note" ADD COLUMN     "category" TEXT,
ADD COLUMN     "content" TEXT NOT NULL,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "title" TEXT NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;
