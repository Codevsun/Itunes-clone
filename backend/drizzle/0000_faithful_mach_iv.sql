CREATE TABLE "artists" (
	"id" bigint PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"artist_url" text
);
--> statement-breakpoint
CREATE TABLE "collections" (
	"id" bigint PRIMARY KEY NOT NULL,
	"artist_id" bigint NOT NULL,
	"name" text NOT NULL,
	"censored_name" text,
	"view_url" text,
	"artwork_url_100" text,
	"price" numeric,
	"release_date" timestamp with time zone,
	"explicitness" text,
	"track_count" integer
);
--> statement-breakpoint
CREATE TABLE "tracks" (
	"id" bigint PRIMARY KEY NOT NULL,
	"collection_id" bigint NOT NULL,
	"artist_id" bigint NOT NULL,
	"name" text NOT NULL,
	"censored_name" text,
	"view_url" text,
	"preview_url" text,
	"artwork_url_100" text,
	"price" numeric,
	"release_date" timestamp with time zone,
	"explicitness" text,
	"disc_number" integer,
	"track_number" integer,
	"duration_ms" integer,
	"genre" text,
	"is_streamable" boolean
);
--> statement-breakpoint
ALTER TABLE "collections" ADD CONSTRAINT "collections_artist_id_artists_id_fk" FOREIGN KEY ("artist_id") REFERENCES "public"."artists"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "tracks" ADD CONSTRAINT "tracks_collection_id_collections_id_fk" FOREIGN KEY ("collection_id") REFERENCES "public"."collections"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "tracks" ADD CONSTRAINT "tracks_artist_id_artists_id_fk" FOREIGN KEY ("artist_id") REFERENCES "public"."artists"("id") ON DELETE no action ON UPDATE no action;