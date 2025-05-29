import { Injectable } from '@nestjs/common';
import { CreateSearchDto } from './dto/create-search.dto';
import { UpdateSearchDto } from './dto/update-search.dto';
import axios from 'axios';
import { db } from '../drizzle/db';
import { artists, collections, tracks } from '../drizzle/schema';

@Injectable()
export class SearchService {
  private readonly ITUNES_API_BASE = 'https://itunes.apple.com/search';

  async search(term: string) {
    try {
      const response = await axios.get(`${this.ITUNES_API_BASE}?term=${encodeURIComponent(term)}`);
      const results = response.data.results;

      // Process and save each result
      for (const result of results) {
        if (result.wrapperType === 'track') {
          // Save artist if it's a music track
          if (result.artistId) {
            await db.insert(artists).values({
              id: result.artistId,
              name: result.artistName,
              artistUrl: result.artistViewUrl,
            }).onConflictDoUpdate({
              target: artists.id,
              set: {
                name: result.artistName,
                artistUrl: result.artistViewUrl,
              },
            });
          }

          // Save collection (album) if present
          if (result.collectionId && result.artistId) {
            await db.insert(collections).values({
              id: result.collectionId,
              artistId: result.artistId,
              name: result.collectionName,
              censoredName: result.collectionCensoredName,
              viewUrl: result.collectionViewUrl,
              artworkUrl100: result.artworkUrl100,
              price: result.collectionPrice,
              releaseDate: result.releaseDate ? new Date(result.releaseDate) : null,
              explicitness: result.collectionExplicitness,
              trackCount: result.trackCount,
            }).onConflictDoUpdate({
              target: collections.id,
              set: {
                name: result.collectionName,
                censoredName: result.collectionCensoredName,
                viewUrl: result.collectionViewUrl,
                artworkUrl100: result.artworkUrl100,
                price: result.collectionPrice,
                releaseDate: result.releaseDate ? new Date(result.releaseDate) : null,
                explicitness: result.collectionExplicitness,
                trackCount: result.trackCount,
              },
            });
          }

          // Save track
          if (result.trackId && result.collectionId && result.artistId) {
            await db.insert(tracks).values({
              id: result.trackId,
              collectionId: result.collectionId,
              artistId: result.artistId,
              name: result.trackName,
              censoredName: result.trackCensoredName,
              viewUrl: result.trackViewUrl,
              previewUrl: result.previewUrl,
              artworkUrl100: result.artworkUrl100,
              price: result.trackPrice,
              releaseDate: result.releaseDate ? new Date(result.releaseDate) : null,
              explicitness: result.trackExplicitness,
              discNumber: result.discNumber,
              trackNumber: result.trackNumber,
              durationMs: result.trackTimeMillis,
              genre: result.primaryGenreName,
              isStreamable: result.isStreamable,
            }).onConflictDoUpdate({
              target: tracks.id,
              set: {
                name: result.trackName,
                censoredName: result.trackCensoredName,
                viewUrl: result.trackViewUrl,
                previewUrl: result.previewUrl,
                artworkUrl100: result.artworkUrl100,
                price: result.trackPrice,
                releaseDate: result.releaseDate ? new Date(result.releaseDate) : null,
                explicitness: result.trackExplicitness,
                discNumber: result.discNumber,
                trackNumber: result.trackNumber,
                durationMs: result.trackTimeMillis,
                genre: result.primaryGenreName,
                isStreamable: result.isStreamable,
              },
            });
          }
        }
      }

      return response.data;
    } catch (error) {
      throw new Error(`Failed to search iTunes: ${error.message}`);
    }
  }

  create(createSearchDto: CreateSearchDto) {
    return 'This action adds a new search';
  }

  findAll() {
    return `This action returns all search`;
  }

  findOne(id: number) {
    return `This action returns a #${id} search`;
  }

  update(id: number, updateSearchDto: UpdateSearchDto) {
    return `This action updates a #${id} search`;
  }

  remove(id: number) {
    return `This action removes a #${id} search`;
  }
}
