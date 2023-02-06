import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Permission } from '../enums/perminssion.enum';
import { User } from '../../users/entities/user.entity';

@Entity()
export class Group {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({
    type: 'enum',
    enum: Permission,
    array: true,
    nullable: true,
  })
  permissions: Permission[];

  @ManyToMany((type) => User, (user) => user.groups)
  users: User[];
}
