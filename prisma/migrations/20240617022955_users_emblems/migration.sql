/*
  Warnings:

  - The primary key for the `Emblem` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Emblem` table. All the data in the column will be lost.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Emblem" DROP CONSTRAINT "Emblem_pkey",
DROP COLUMN "id",
ADD COLUMN     "Id" SERIAL NOT NULL,
ADD CONSTRAINT "Emblem_pkey" PRIMARY KEY ("Id");

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
DROP COLUMN "id",
ADD COLUMN     "Id" SERIAL NOT NULL,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("Id");

-- CreateTable
CREATE TABLE "UsersEmblems" (
    "EmblemId" INTEGER NOT NULL,
    "UserId" INTEGER NOT NULL,

    CONSTRAINT "UsersEmblems_pkey" PRIMARY KEY ("EmblemId","UserId")
);

-- AddForeignKey
ALTER TABLE "UsersEmblems" ADD CONSTRAINT "UsersEmblems_EmblemId_fkey" FOREIGN KEY ("EmblemId") REFERENCES "Emblem"("Id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UsersEmblems" ADD CONSTRAINT "UsersEmblems_UserId_fkey" FOREIGN KEY ("UserId") REFERENCES "User"("Id") ON DELETE RESTRICT ON UPDATE CASCADE;
