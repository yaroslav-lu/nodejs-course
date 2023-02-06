import { Group } from '../../groups/entities/group.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinTable,
  ManyToMany,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  login: string;

  @Column()
  password: string;

  @Column()
  age: number;

  @Column({ default: false })
  isDeleted: boolean;

  @JoinTable()
  @ManyToMany((type) => Group, (group) => group.users, {
    cascade: true,
  })
  groups: Group[];
}
