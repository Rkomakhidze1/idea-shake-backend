import { Test, TestingModule } from '@nestjs/testing';
import { User } from '../auth/entities/user.entity';
import { CreatePostDto } from './dto/create-post.dto';
import { PostsRepository } from './posts.repository';
import { PostsService } from './posts.service';

describe('PostsService', () => {
  let service: PostsService;
  let user: User;
  let postDto: CreatePostDto;
  let post;

  const mockPostsRepository = {
    createPost: jest.fn(async () => post),
    find: jest.fn(async () => [post]),
    findOne: jest.fn(async () => post),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PostsService, PostsRepository],
    })
      .overrideProvider(PostsRepository)
      .useValue(mockPostsRepository)
      .compile();

    service = module.get<PostsService>(PostsService);
    post = {
      id: 1,
      text: 'text',
      toResponseObject: jest.fn(() => ({ id: 1, text: 'text' })),
    };
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create post', async () => {
    expect(await service.create(postDto, user)).toEqual({
      id: 1,
      text: 'text',
    });
    expect(post.toResponseObject).toHaveBeenCalled();
  });

  it('should return all posts', async () => {
    expect(await service.findAll()).toHaveLength(1);
    expect(post.toResponseObject).toHaveBeenCalled();
  });

  it('should return one post', async () => {
    expect(await service.findOne(1)).toEqual(post);
  });
});
