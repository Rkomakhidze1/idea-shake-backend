import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

describe('AuthController', () => {
  let controller: AuthController;
  let authCredentialsDto;
  let signinRes;

  const mockAuthService = {
    signUp: jest.fn(() => null),
    signIn: jest.fn(() => signinRes),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [AuthService],
    })
      .overrideProvider(AuthService)
      .useValue(mockAuthService)
      .compile();

    controller = module.get<AuthController>(AuthController);
    authCredentialsDto = { username: 'user', password: 'password' };
    signinRes = { accessToken: 'toen', username: 'user' };
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should sign user up', () => {
    controller.signUp(authCredentialsDto);
    expect(mockAuthService.signUp).toHaveBeenCalled();
  });

  it('should sign user in', () => {
    expect(controller.signIn(authCredentialsDto)).toEqual(signinRes);
  });
});
