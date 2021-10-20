import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePostDto } from './dto/create-post.dto';
import { PostsRepository } from './posts.repository';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(PostsRepository)
    private postsRepository: PostsRepository,
  ) {}

  async create(createPostDto: CreatePostDto) {
    try {
      const post = await this.postsRepository.createPost(createPostDto);
      return post;
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  async findAll() {
    return this.postsRepository.find({});
  }

  async findOne(id: string) {
    console.log(id);
    const found = await this.postsRepository.findOne(id);

    if (!found) {
      throw new NotFoundException(`Post with ID "${id}" not found`);
    }

    return found;
  }
}
