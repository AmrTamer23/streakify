/*
  Warnings:

  - You are about to drop the column `activity` on the `Habit` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Habit" DROP COLUMN "activity";

-- CreateTable
CREATE TABLE "Activity" (
    "id" SERIAL NOT NULL,
    "habitId" INTEGER NOT NULL,
    "x" INTEGER NOT NULL,
    "y" INTEGER NOT NULL,
    "date" INTEGER NOT NULL,

    CONSTRAINT "Activity_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Activity" ADD CONSTRAINT "Activity_habitId_fkey" FOREIGN KEY ("habitId") REFERENCES "Habit"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
