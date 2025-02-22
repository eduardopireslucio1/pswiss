import { Module } from '@nestjs/common';
import { DatabaseService } from './database.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/user';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [DatabaseService],
  exports: [DatabaseService],
})
export class DatabaseModule {}
