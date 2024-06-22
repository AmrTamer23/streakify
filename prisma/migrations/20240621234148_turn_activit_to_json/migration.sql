/*
  Warnings:

  - The `activity` column on the `Habit` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Habit" DROP COLUMN "activity",
ADD COLUMN     "activity" JSONB NOT NULL DEFAULT '{}';
