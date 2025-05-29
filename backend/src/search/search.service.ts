import { Injectable } from '@nestjs/common';
import { CreateSearchDto } from './dto/create-search.dto';
import { UpdateSearchDto } from './dto/update-search.dto';
import axios from 'axios';

@Injectable()
export class SearchService {
  private readonly ITUNES_API_BASE = 'https://itunes.apple.com/search';

  async search(term: string) {
    try {
      const response = await axios.get(`${this.ITUNES_API_BASE}?term=${encodeURIComponent(term)}`);
      console.log('Response:', response.data);
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
