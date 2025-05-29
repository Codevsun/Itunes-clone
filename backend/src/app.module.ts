import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DrizzleModule } from './drizzle/drizzle.module';
import { ArtistModule } from './artist/artist.module';
import { SearchModule } from './search/search.module';

@Module({
  imports: [DrizzleModule, ArtistModule, SearchModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
