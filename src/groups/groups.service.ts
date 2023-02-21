import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Group } from './entities/group.entity';
import { DataSource, Repository } from 'typeorm';
import { AddUserDto } from './dto/add-user.dto';
import { User } from '../users/entities/user.entity';

@Injectable()
export class GroupsService {
  constructor(
    @InjectRepository(Group)
    private readonly groupsRepository: Repository<Group>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly dataSource: DataSource,
  ) {}

  create(createGroupDto: CreateGroupDto) {
    const group = this.groupsRepository.create({
      ...createGroupDto,
    });
    return this.groupsRepository.save(group);
  }

  findAll() {
    return this.groupsRepository.find({
      relations: {
        users: true,
      },
    });
  }

  async findOne(id: string) {
    const group = await this.groupsRepository.findOne({
      where: {
        id: id,
      },
      relations: {
        users: true,
      },
    });
    if (!group) {
      throw new NotFoundException(`Group #${id} not found.`);
    }
    return group;
  }

  async update(id: string, updateGroupDto: UpdateGroupDto) {
    const group = await this.groupsRepository.preload({
      id: id,
      ...updateGroupDto,
    });
    if (!group) {
      throw new NotFoundException(`Group #${id} not found`);
    }
    return this.groupsRepository.save(group);
  }

  async remove(id: string) {
    const group = await this.findOne(id);
    return this.groupsRepository.remove(group);
  }

  async addUser(id: string, addUserDto: AddUserDto) {
    const group = await this.findOne(id);

    if (!group) {
      throw new NotFoundException(`Group #${id} not found`);
    }

    const users = await Promise.all(
      addUserDto.users.map((id) => this.findUserById(id)),
    );
    group.users.push(...users);

    // Just for the task.
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      await queryRunner.manager.save(group);
      queryRunner.commitTransaction();
    } catch (error) {
      queryRunner.rollbackTransaction();
    }

    return group;
  }

  private async findUserById(id: string): Promise<User> {
    const existingUser = await this.userRepository.findOneBy({ id });
    if (!existingUser) {
      throw new NotFoundException(`User #${id} not found`);
    }
    return existingUser;
  }
}
