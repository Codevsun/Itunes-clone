import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { artists, tracks } from '../drizzle/schema';
import { db } from '../drizzle/db';
import { and, eq, isNotNull } from 'drizzle-orm';

@Injectable()
export class ArtistService {
  async create(createArtistDto: CreateArtistDto) {
    const [newArtist] = await db
      .insert(artists)
      .values(createArtistDto)
      .returning();
    return newArtist;
  }

  async findAll() {
    return await db.select().from(artists);
  }

  async findOne(id: number) {
    if (isNaN(id)) {
      throw new NotFoundException('Invalid artist ID');
    }
    const [artist] = await db.select().from(artists).where(eq(artists.id, id));
    if (!artist) {
      throw new NotFoundException('Artist not found');
    }
    return artist;
  }

  async update(id: number, updateArtistDto: UpdateArtistDto) {
    if (isNaN(id)) {
      throw new NotFoundException('Invalid artist ID');
    }
    const [updatedArtist] = await db
      .update(artists)
      .set(updateArtistDto)
      .where(eq(artists.id, id))
      .returning();
    if (!updatedArtist) {
      throw new NotFoundException('Artist not found');
    }
    return updatedArtist;
  }

  async remove(id: number) {
    if (isNaN(id)) {
      throw new NotFoundException('Invalid artist ID');
    }
    const [deletedArtist] = await db
      .delete(artists)
      .where(eq(artists.id, id))
      .returning();
    if (!deletedArtist) {
      throw new NotFoundException('Artist not found');
    }
    return deletedArtist;
  }

  async findAllTracks() {
    const result = await db
      .select({
        title: tracks.name,
        artist: artists.name,
        coverImage: tracks.artworkUrl100,
        previewUrl: tracks.previewUrl,
        releaseDate: tracks.releaseDate,
        genre: tracks.genre,
        durationMs: tracks.durationMs,
        isStreamable: tracks.isStreamable,
        price: tracks.price,
        explicitness: tracks.explicitness,
        discNumber: tracks.discNumber,
        trackNumber: tracks.trackNumber,
      })
      .from(tracks)
      .innerJoin(artists, eq(tracks.artistId, artists.id))
      .where(isNotNull(tracks.name));
    
    return result;
  }
}