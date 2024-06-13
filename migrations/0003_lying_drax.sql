DROP INDEX IF EXISTS "hashtag_mappings_post_id_idx";--> statement-breakpoint
DROP INDEX IF EXISTS "hashtag_mappings_hashtag_id_idx";--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "hashtag_mappings_post_id_idx" ON "hashtag_mappings" USING btree ("post_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "hashtag_mappings_hashtag_id_idx" ON "hashtag_mappings" USING btree ("hashtag_id");