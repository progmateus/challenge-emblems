-- CreateTable
CREATE TABLE "Emblem" (
    "id" SERIAL NOT NULL,
    "Slug" VARCHAR(255) NOT NULL,
    "Name" VARCHAR(255) NOT NULL,
    "Image" TEXT NOT NULL,
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Emblem_pkey" PRIMARY KEY ("id")
);
