DROP INDEX IF EXISTS "comments_user_id_idx";--> statement-breakpoint
DROP INDEX IF EXISTS "comments_post_id_idx";--> statement-breakpoint
DROP INDEX IF EXISTS "comments_parent_id_idx";--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "comments_user_id_idx" ON "comments" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "comments_post_id_idx" ON "comments" USING btree ("post_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "comments_parent_id_idx" ON "comments" USING btree ("parent_id");