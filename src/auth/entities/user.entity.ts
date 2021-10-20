import { Post } from 'src/posts/entities/post.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { UserRO } from '../dto/user-ro';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @OneToMany(() => Post, (post) => post.author, { eager: true })
  posts: Post[];

  toResponseObject(): UserRO {
    const { id, username } = this;
    const responseObject: UserRO = {
      id,
      username,
    };

    return responseObject;
  }
}
