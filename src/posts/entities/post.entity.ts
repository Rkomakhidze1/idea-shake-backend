import { User } from 'src/auth/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { PostRo } from '../dto/post-ro';

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  text: string;

  @ManyToOne(() => User, (user) => user.posts, { eager: false })
  author: User;

  toResponseObject(): PostRo {
    if (!this.author) return this;

    const { author } = this;
    const responseObject: PostRo = {
      ...this,
      author: author.toResponseObject(),
    };
    return responseObject;
  }
}
