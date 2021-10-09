import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm';
import { Exclude } from 'class-transformer';
@Entity('users')
export class User {
  @PrimaryColumn()
  id: string;

  @Column()
  username: string;

  @Exclude()
  @Column()
  password: string;

  @CreateDateColumn()
  created_ad: Date;
}
