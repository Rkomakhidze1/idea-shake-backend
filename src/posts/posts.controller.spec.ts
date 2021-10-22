import { Test, TestingModule } from '@nestjs/testing';
import { UserRO } from 'src/auth/dto/user-ro';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';

describe('PostsController', () => {
  let controller: PostsController;
  let user;
  let postDto;

  const allPostsRes = [
    { id: 1, text: 'text' },
    { id: 2, text: 'text' },
  ];

  const mockPostsService = {
    create: jest.fn((dto) => ({
      id: 1,
      ...dto,
    })),

    findAll: jest.fn(() => allPostsRes),
    findOne: jest.fn(() => allPostsRes[0]),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PostsController],
      providers: [PostsService],
    })
      .overrideProvider(PostsService)
      .useValue(mockPostsService)
      .compile();

    controller = module.get<PostsController>(PostsController);

    postDto = { text: 'post body' };
    user = {
      id: 1,
      username: 'user',
      posts: [],
      password: '',
      toResponseObject: (): UserRO => {
        return { id: 1, username: 'user' };
      },
    };
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a post', () => {
    expect(controller.create(postDto, user)).toEqual({ id: 1, ...postDto });
  });

  it('should get all posts', () => {
    expect(controller.findAll()).toEqual(allPostsRes);
  });

  it('should get a single post', () => {
    expect(controller.findOne('1')).toEqual(allPostsRes[0]);
  });
});
