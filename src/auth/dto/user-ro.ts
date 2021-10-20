import { Post } from '../../posts/entities/post.entity';

export class UserRO {
  id: number;
  username: string;
  posts?: Post[];
}
