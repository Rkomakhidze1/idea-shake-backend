import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';

import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { UsersRepository } from './user.repository';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UsersRepository)
    private usersRepository: UsersRepository,
    private jwtService: JwtService,
  ) {}

  async signUp(authCredentialsDto: AuthCredentialsDto) {
    return this.usersRepository.createUser(authCredentialsDto);
  }

  async signIn(authCredentialsDto: AuthCredentialsDto) {
    const { username, password } = authCredentialsDto;
    const user = await this.usersRepository.findOne({ username });

    if (user && (await bcrypt.compare(password, user.password))) {
      const payload: JwtPayload = { username };
      const accessToken: string = this.jwtService.sign(payload);
      return { accessToken, username };
    } else {
      throw new UnauthorizedException('Please check your login credentials');
    }
  }
}
