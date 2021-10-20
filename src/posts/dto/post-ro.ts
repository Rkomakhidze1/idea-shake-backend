import { UserRO } from 'src/auth/dto/user-ro';

export class PostRo {
  id: number;
  text: string;
  author?: UserRO;
}
