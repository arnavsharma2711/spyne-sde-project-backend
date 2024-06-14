DO $$ BEGIN
 CREATE TYPE "public"."reaction_type_enum" AS ENUM('like', 'dislike');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "reactions" ADD COLUMN "reaction_type_enum" "reaction_type_enum" NOT NULL;