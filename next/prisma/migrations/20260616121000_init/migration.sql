-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "public";

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" VARCHAR(30) NOT NULL,
    "provider" VARCHAR(30) NOT NULL,
    "currentStreakDays" INTEGER,
    "longestStreakDays" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Diary" (
    "id" SERIAL NOT NULL,
    "email" VARCHAR(30) NOT NULL,
    "visible" BOOLEAN NOT NULL,
    "emotion" INTEGER NOT NULL,
    "text" TEXT NOT NULL,
    "date" VARCHAR(10) NOT NULL,
    "UserId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Diary_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Habit" (
    "id" SERIAL NOT NULL,
    "email" VARCHAR(30) NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "priority" INTEGER NOT NULL,
    "UserId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Habit_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Image" (
    "id" SERIAL NOT NULL,
    "src" VARCHAR(500) NOT NULL,
    "order" INTEGER,
    "diaryId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Image_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DiaryHabit" (
    "HabitId" INTEGER NOT NULL,
    "diaryId" INTEGER NOT NULL,

    CONSTRAINT "DiaryHabit_pkey" PRIMARY KEY ("HabitId","diaryId")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE INDEX "Diary_UserId_date_idx" ON "Diary"("UserId", "date");

-- CreateIndex
CREATE UNIQUE INDEX "Diary_UserId_date_key" ON "Diary"("UserId", "date");

-- CreateIndex
CREATE INDEX "Habit_UserId_idx" ON "Habit"("UserId");

-- CreateIndex
CREATE UNIQUE INDEX "Habit_UserId_name_key" ON "Habit"("UserId", "name");

-- CreateIndex
CREATE INDEX "Image_diaryId_idx" ON "Image"("diaryId");

-- CreateIndex
CREATE INDEX "DiaryHabit_diaryId_idx" ON "DiaryHabit"("diaryId");

-- AddForeignKey
ALTER TABLE "Diary" ADD CONSTRAINT "Diary_UserId_fkey" FOREIGN KEY ("UserId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Habit" ADD CONSTRAINT "Habit_UserId_fkey" FOREIGN KEY ("UserId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Image" ADD CONSTRAINT "Image_diaryId_fkey" FOREIGN KEY ("diaryId") REFERENCES "Diary"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DiaryHabit" ADD CONSTRAINT "DiaryHabit_diaryId_fkey" FOREIGN KEY ("diaryId") REFERENCES "Diary"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DiaryHabit" ADD CONSTRAINT "DiaryHabit_HabitId_fkey" FOREIGN KEY ("HabitId") REFERENCES "Habit"("id") ON DELETE CASCADE ON UPDATE CASCADE;
