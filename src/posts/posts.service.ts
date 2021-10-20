import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { User } from 'src/auth/entities/user.entity';
import { CreatePostDto } from './dto/create-post.dto';
import { PostsRepository } from './posts.repository';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(PostsRepository)
    private postsRepository: PostsRepository,
  ) {}

  async create(createPostDto: CreatePostDto, user: User) {
    try {
      const post = await this.postsRepository.createPost(createPostDto, user);
      return post.toResponseObject();
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  async findAll() {
    const posts = await this.postsRepository.find({ relations: ['author'] });
    return posts.map((post) => post.toResponseObject());
  }

  async findOne(id: number) {
    const found = await this.postsRepository.findOne(id);

    if (!found) {
      throw new NotFoundException(`Post with ID "${id}" not found`);
    }

    return found;
  }
}
