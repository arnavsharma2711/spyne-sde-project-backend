DROP INDEX IF EXISTS "posts_user_id_idx";--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "posts_user_id_idx" ON "posts" USING btree ("user_id");