import {
  pgTable,
  text,
  integer,
  bigint,
  decimal,
  boolean,
  timestamp,
  pgEnum,
  serial,
  index,
} from 'drizzle-orm/pg-core';

// === Enums ===
export const contentTypeEnum = pgEnum('content_type', [
  'music',
  'podcast',
  'audiobook',
]);
export const explicitnessEnum = pgEnum('explicitness', [
  'explicit',
  'notExplicit',
  'cleaned',
]);
export const wrapperTypeEnum = pgEnum('wrapper_type', [
  'track',
  'collection',
  'artist',
]);
export const kindEnum = pgEnum('kind', [
  'song',
  'podcast',
  'feature-movie',
  'tv-episode',
  'audiobook',
]);

// === 1. Artists Table ===
export const artists = pgTable('artists', {
  id: bigint('id', { mode: 'number' }).primaryKey(), // iTunes artistId
  name: text('name').notNull(),
  artistUrl: text('artist_url'),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow(),
});

// === 2. Collections Table (Albums/Podcasts/Shows) ===
export const collections = pgTable(
  'collections',
  {
    id: bigint('id', { mode: 'number' }).primaryKey(), // iTunes collectionId
    artistId: bigint('artist_id', { mode: 'number' }).references(
      () => artists.id,
    ),
    name: text('name').notNull(),
    censoredName: text('censored_name'),
    viewUrl: text('view_url'),
    artworkUrl30: text('artwork_url_30'),
    artworkUrl60: text('artwork_url_60'),
    artworkUrl100: text('artwork_url_100'),
    price: decimal('price', { precision: 10, scale: 2 }),
    releaseDate: timestamp('release_date', { withTimezone: true }),
    explicitness: explicitnessEnum('explicitness').default('notExplicit'),
    discCount: integer('disc_count').default(1),
    trackCount: integer('track_count'),
    country: text('country').default('USA'),
    currency: text('currency').default('USD'),
    primaryGenre: text('primary_genre'),
    contentType: contentTypeEnum('content_type').default('music'),
    createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow(),
  },
  (table) => ({
    genreIdx: index('collections_genre_idx').on(table.primaryGenre),
    contentTypeIdx: index('collections_content_type_idx').on(table.contentType),
    releaseDateIdx: index('collections_release_date_idx').on(table.releaseDate),
  }),
);

// === 3. Tracks Table ===
export const tracks = pgTable(
  'tracks',
  {
    id: bigint('id', { mode: 'number' }).primaryKey(), // iTunes trackId
    collectionId: bigint('collection_id', { mode: 'number' }).references(
      () => collections.id,
    ),
    artistId: bigint('artist_id', { mode: 'number' }).references(
      () => artists.id,
    ),
    name: text('name').notNull(),
    censoredName: text('censored_name'),
    wrapperType: wrapperTypeEnum('wrapper_type').default('track'),
    kind: kindEnum('kind').default('song'),
    viewUrl: text('view_url'),
    previewUrl: text('preview_url'),
    artworkUrl30: text('artwork_url_30'),
    artworkUrl60: text('artwork_url_60'),
    artworkUrl100: text('artwork_url_100'),
    price: decimal('price', { precision: 10, scale: 2 }),
    releaseDate: timestamp('release_date', { withTimezone: true }),
    explicitness: explicitnessEnum('explicitness').default('notExplicit'),
    discNumber: integer('disc_number').default(1),
    trackNumber: integer('track_number'),
    trackTimeMillis: integer('track_time_millis'),
    country: text('country').default('USA'),
    currency: text('currency').default('USD'),
    primaryGenre: text('primary_genre'),
    isStreamable: boolean('is_streamable').default(true),
    createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow(),
  },
  (table) => ({
    genreIdx: index('tracks_genre_idx').on(table.primaryGenre),
    kindIdx: index('tracks_kind_idx').on(table.kind),
    releaseDateIdx: index('tracks_release_date_idx').on(table.releaseDate),
    streamableIdx: index('tracks_streamable_idx').on(table.isStreamable),
  }),
);

// === 4. Genres Table (for better organization) ===
export const genres = pgTable('genres', {
  id: serial('id').primaryKey(),
  name: text('name').notNull().unique(),
  slug: text('slug').notNull().unique(),
  description: text('description'),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
});

// === Relations ===
import { relations } from 'drizzle-orm';

export const artistsRelations = relations(artists, ({ many }) => ({
  collections: many(collections),
  tracks: many(tracks),
}));

export const collectionsRelations = relations(collections, ({ one, many }) => ({
  artist: one(artists, {
    fields: [collections.artistId],
    references: [artists.id],
  }),
  tracks: many(tracks),
}));

export const tracksRelations = relations(tracks, ({ one }) => ({
  collection: one(collections, {
    fields: [tracks.collectionId],
    references: [collections.id],
  }),
  artist: one(artists, {
    fields: [tracks.artistId],
    references: [artists.id],
  }),
}));

// === Types for TypeScript ===
export type Artist = typeof artists.$inferSelect;
export type NewArtist = typeof artists.$inferInsert;

export type Collection = typeof collections.$inferSelect;
export type NewCollection = typeof collections.$inferInsert;

export type Track = typeof tracks.$inferSelect;
export type NewTrack = typeof tracks.$inferInsert;

export type Genre = typeof genres.$inferSelect;
export type NewGenre = typeof genres.$inferInsert;

// === Helper Types for API Responses ===
export type ContentByGenre = {
  genreName: string;
  genreSlug: string;
  contentItems: Array<{
    id: number;
    title: string;
    artist: string;
    artwork: string;
    type: string;
  }>;
};
