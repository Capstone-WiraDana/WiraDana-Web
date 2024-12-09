-- CreateEnum
CREATE TYPE "Roles" AS ENUM ('investor', 'umkm');

-- CreateEnum
CREATE TYPE "Types" AS ENUM ('vc', 'angel');

-- CreateEnum
CREATE TYPE "BScale" AS ENUM ('mikro', 'kecil', 'menengah');

-- CreateEnum
CREATE TYPE "BType" AS ENUM ('KM', 'FT', 'A', 'KT', 'TD', 'KK', 'PP', 'OT', 'PU', 'P');

-- CreateEnum
CREATE TYPE "Status" AS ENUM ('pending', 'paid');

-- CreateEnum
CREATE TYPE "WStatus" AS ENUM ('pending', 'completed');

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "Roles" NOT NULL,
    "bank_name" TEXT NOT NULL DEFAULT '-',
    "account_number" TEXT NOT NULL DEFAULT '-',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "investor" (
    "user_id" INTEGER NOT NULL,
    "photo_url" TEXT NOT NULL DEFAULT 'https://storage.googleapis.com/wiradana-bucket/uploads/users/default.png',
    "username" TEXT NOT NULL,
    "description" TEXT,
    "location" TEXT NOT NULL,
    "type" "Types" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "investor_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "umkm" (
    "user_id" INTEGER NOT NULL,
    "logo_url" TEXT NOT NULL DEFAULT 'https://storage.googleapis.com/wiradana-bucket/uploads/users/default.png',
    "umkm_name" TEXT NOT NULL,
    "owner_name" TEXT NOT NULL,
    "description" TEXT,
    "business_scale" "BScale" NOT NULL,
    "business_type" "BType" NOT NULL,
    "employees_number" INTEGER NOT NULL,
    "founded_year" INTEGER NOT NULL,
    "location" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "umkm_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "report" (
    "id" SERIAL NOT NULL,
    "umkm_id" INTEGER NOT NULL,
    "financial_report_url" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "report_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "story" (
    "id" SERIAL NOT NULL,
    "umkm_id" INTEGER NOT NULL,
    "photo_url" TEXT NOT NULL DEFAULT 'https://storage.googleapis.com/wiradana-bucket/uploads/stories/default.png',
    "caption" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "story_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "likes_story" (
    "id" SERIAL NOT NULL,
    "story_id" INTEGER NOT NULL,
    "investor_id" INTEGER NOT NULL,

    CONSTRAINT "likes_story_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "fundraising" (
    "id" SERIAL NOT NULL,
    "umkm_id" INTEGER NOT NULL,
    "photo_url" TEXT NOT NULL DEFAULT 'https://storage.googleapis.com/wiradana-bucket/uploads/fundraising/photo/default.png',
    "description" TEXT NOT NULL,
    "required_funds" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "fundraising_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "investment_contributors" (
    "id" SERIAL NOT NULL,
    "fund_id" INTEGER NOT NULL,
    "investor_id" INTEGER NOT NULL,
    "amount" DECIMAL(65,30) NOT NULL,
    "payment_status" "Status" NOT NULL DEFAULT 'pending',
    "latest_amount_return" DECIMAL(65,30) NOT NULL,
    "latest_amount_status" "WStatus" NOT NULL DEFAULT 'pending',
    "latest_return_date" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "investment_contributors_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "history_funding_withdrawals" (
    "id" SERIAL NOT NULL,
    "fund_id" INTEGER NOT NULL,
    "amount" DECIMAL(65,30) NOT NULL,
    "status" "WStatus" NOT NULL DEFAULT 'pending',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "history_funding_withdrawals_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- AddForeignKey
ALTER TABLE "investor" ADD CONSTRAINT "investor_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "umkm" ADD CONSTRAINT "umkm_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "report" ADD CONSTRAINT "report_umkm_id_fkey" FOREIGN KEY ("umkm_id") REFERENCES "umkm"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "story" ADD CONSTRAINT "story_umkm_id_fkey" FOREIGN KEY ("umkm_id") REFERENCES "umkm"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "likes_story" ADD CONSTRAINT "likes_story_story_id_fkey" FOREIGN KEY ("story_id") REFERENCES "story"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "likes_story" ADD CONSTRAINT "likes_story_investor_id_fkey" FOREIGN KEY ("investor_id") REFERENCES "investor"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "fundraising" ADD CONSTRAINT "fundraising_umkm_id_fkey" FOREIGN KEY ("umkm_id") REFERENCES "umkm"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "investment_contributors" ADD CONSTRAINT "investment_contributors_fund_id_fkey" FOREIGN KEY ("fund_id") REFERENCES "fundraising"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "investment_contributors" ADD CONSTRAINT "investment_contributors_investor_id_fkey" FOREIGN KEY ("investor_id") REFERENCES "investor"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "history_funding_withdrawals" ADD CONSTRAINT "history_funding_withdrawals_fund_id_fkey" FOREIGN KEY ("fund_id") REFERENCES "fundraising"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
