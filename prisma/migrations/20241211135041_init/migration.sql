-- CreateTable
CREATE TABLE "story_comments" (
    "id" SERIAL NOT NULL,
    "story_id" INTEGER NOT NULL,
    "investor_id" INTEGER NOT NULL,
    "comment" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "story_comments_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "story_comments" ADD CONSTRAINT "story_comments_story_id_fkey" FOREIGN KEY ("story_id") REFERENCES "story"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "story_comments" ADD CONSTRAINT "story_comments_investor_id_fkey" FOREIGN KEY ("investor_id") REFERENCES "investor"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;
