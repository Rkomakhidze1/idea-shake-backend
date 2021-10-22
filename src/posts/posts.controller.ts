import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../shared/get-user.decorator';
import { User } from '../auth/entities/user.entity';

@UseGuards(AuthGuard())
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  create(@Body() createPostDto: CreatePostDto, @GetUser() user: User) {
    // console.log(user);
    return this.postsService.create(createPostDto, user);
  }

  @Get()
  findAll() {
    return this.postsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postsService.findOne(+id);
  }
}
