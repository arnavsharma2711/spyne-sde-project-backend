DROP INDEX IF EXISTS "follower_mappings_follower_id_idx";--> statement-breakpoint
DROP INDEX IF EXISTS "follower_mappings_following_id_idx";--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "follower_mappings_follower_id_idx" ON "follower_mappings" USING btree ("follower_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "follower_mappings_following_id_idx" ON "follower_mappings" USING btree ("following_id");