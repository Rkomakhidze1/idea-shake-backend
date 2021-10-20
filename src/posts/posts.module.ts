import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostsRepository } from './posts.repository';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([PostsRepository]), AuthModule],
  controllers: [PostsController],
  providers: [PostsService],
})
export class PostsModule {}
