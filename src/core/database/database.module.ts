import { Module } from '@nestjs/common';
import {
  databaseProviders,
  databaseRepositoryProviders,
} from './database.providers';

@Module({
  imports: [...databaseProviders],
  providers: [...databaseRepositoryProviders],
  exports: [...databaseProviders, ...databaseRepositoryProviders],
})
export class DatabaseModule {}
