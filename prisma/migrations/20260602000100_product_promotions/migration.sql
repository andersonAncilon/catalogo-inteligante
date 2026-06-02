ALTER TABLE "products"
ADD COLUMN "compare_at_price" DECIMAL(12, 2),
ADD COLUMN "is_featured" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN "promotion_label" TEXT;

CREATE INDEX "products_business_id_is_featured_idx" ON "products"("business_id", "is_featured");
