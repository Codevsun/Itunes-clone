import { Injectable } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';

@Injectable()
export class ArtistService {
  private artists: CreateArtistDto[] = [
    {
      id: 1,
      name: 'Artist 1',
      artistUrl: 'https://artist1.com',
    },
    {
      id: 2,
      name: 'Artist 2',
      artistUrl: 'https://artist2.com',
    },
  ];

  create(createArtistDto: CreateArtistDto) {
    const newArtist: CreateArtistDto = {
      ...createArtistDto,
    };
    this.artists.push(newArtist);
    return newArtist;
  }

  findAll() {
    return this.artists;
  }

  findOne(id: number) {
    return this.artists.find((artist) => artist.id === id);
  }

  update(id: number, updateArtistDto: UpdateArtistDto) {
    const artistIndex = this.artists.findIndex((artist) => artist.id === id);
    if (artistIndex >= 0) {
      this.artists[artistIndex] = {
        ...this.artists[artistIndex],
        ...updateArtistDto,
      };
      return this.artists[artistIndex];
    }
    return null;
  }

  remove(id: number) {
    const artistIndex = this.artists.findIndex((artist) => artist.id === id);
    if (artistIndex >= 0) {
      const removedArtist = this.artists[artistIndex];
      this.artists.splice(artistIndex, 1);
      return removedArtist;
    }
    return null;
  }
}
