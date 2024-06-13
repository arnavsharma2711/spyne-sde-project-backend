DROP INDEX IF EXISTS "users_phone_number_idx";--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "users_phone_number_idx" ON "users" USING btree ("phone_number");