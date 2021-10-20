import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  text: string;

  //   @ManyToOne((_type) => User, (user) => user.posts, { eager: false })
  //   author: User;
}
