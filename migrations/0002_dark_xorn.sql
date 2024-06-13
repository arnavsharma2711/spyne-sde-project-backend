DROP INDEX IF EXISTS "users_phone_number_idx";--> statement-breakpoint
DROP INDEX IF EXISTS "users_full_name_idx";--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "users_phone_number_idx" ON "users" USING btree ("phone_number");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "users_full_name_idx" ON "users" USING btree ("full_name");