-- CreateEnum
CREATE TYPE "Genre" AS ENUM ('NOVEL', 'POETRY_DRAMA', 'ESSAY', 'HUMANITIES', 'SOCIETY', 'HISTORY', 'SCIENCE_TECH', 'ECONOMY_BUSINESS', 'SELF_HELP', 'ART_CULTURE', 'RELIGION', 'ETC');

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password_hash" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "books" (
    "id" TEXT NOT NULL,
    "isbn" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "publisher" TEXT NOT NULL,
    "published_year" INTEGER,
    "cover_url" TEXT,

    CONSTRAINT "books_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "records" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "book_id" TEXT NOT NULL,
    "category" "Genre" NOT NULL,
    "rating" INTEGER NOT NULL,
    "review" TEXT NOT NULL,
    "is_ebook" BOOLEAN NOT NULL,
    "finished_at" DATE NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "records_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "quotes" (
    "id" TEXT NOT NULL,
    "record_id" TEXT NOT NULL,
    "page" INTEGER NOT NULL,
    "text" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "quotes_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE INDEX "books_isbn_idx" ON "books"("isbn");

-- CreateIndex
CREATE INDEX "records_user_id_idx" ON "records"("user_id");

-- CreateIndex
CREATE INDEX "records_book_id_idx" ON "records"("book_id");

-- CreateIndex
CREATE INDEX "quotes_record_id_idx" ON "quotes"("record_id");

-- AddForeignKey
ALTER TABLE "records" ADD CONSTRAINT "records_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "records" ADD CONSTRAINT "records_book_id_fkey" FOREIGN KEY ("book_id") REFERENCES "books"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "quotes" ADD CONSTRAINT "quotes_record_id_fkey" FOREIGN KEY ("record_id") REFERENCES "records"("id") ON DELETE CASCADE ON UPDATE CASCADE;
