import {
  pgTable,
  text,
  integer,
  bigint,
  decimal,
  boolean,
  timestamp,
} from 'drizzle-orm/pg-core';

// === 1. Artists Table ===
export const artists = pgTable('artists', {
  id: bigint('id', { mode: 'number' }).primaryKey(), // iTunes artistId
  name: text('name').notNull(),
  artistUrl: text('artist_url'),
  createdAt: timestamp('created_at', { withTimezone: true }),
});

// === 2. Collections Table (Albums) ===
export const collections = pgTable('collections', {
  id: bigint('id', { mode: 'number' }).primaryKey(), // iTunes collectionId
  artistId: bigint('artist_id', { mode: 'number' })
    .notNull()
    .references(() => artists.id),
  name: text('name').notNull(),
  censoredName: text('censored_name'),
  viewUrl: text('view_url'),
  artworkUrl100: text('artwork_url_100'),
  price: decimal('price'),
  releaseDate: timestamp('release_date', { withTimezone: true }),
  explicitness: text('explicitness'),
  trackCount: integer('track_count'),
});

// === 3. Tracks Table ===
export const tracks = pgTable('tracks', {
  id: bigint('id', { mode: 'number' }).primaryKey(), // iTunes trackId
  collectionId: bigint('collection_id', { mode: 'number' })
    .notNull()
    .references(() => collections.id),
  artistId: bigint('artist_id', { mode: 'number' })
    .notNull()
    .references(() => artists.id),
  name: text('name').notNull(),
  censoredName: text('censored_name'),
  viewUrl: text('view_url'),
  previewUrl: text('preview_url'),
  artworkUrl100: text('artwork_url_100'),
  price: decimal('price'),
  releaseDate: timestamp('release_date', { withTimezone: true }),
  explicitness: text('explicitness'),
  discNumber: integer('disc_number'),
  trackNumber: integer('track_number'),
  durationMs: integer('duration_ms'),
  genre: text('genre'),
  isStreamable: boolean('is_streamable'),
  createdAt: timestamp('created_at', { withTimezone: true }),
});
