DROP INDEX IF EXISTS "reactions_entity_type_idx";--> statement-breakpoint
DROP INDEX IF EXISTS "reactions_entity_id_idx";--> statement-breakpoint
DROP INDEX IF EXISTS "reactions_user_id_idx";--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "reactions_entity_type_entity_id_idx" ON "reactions" USING btree ("entity_type","entity_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "reactions_entity_type_entity_id_reaction_type_idx" ON "reactions" USING btree ("entity_type","entity_id","reaction_type_enum");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "reactions_user_id_idx" ON "reactions" USING btree ("user_id");