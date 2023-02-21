import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Like, Repository } from 'typeorm';
import { PaginationUserQueryDto } from './dto/pagination-user-query.dto';
import { Group } from '../groups/entities/group.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Group)
    private readonly groupsRepository: Repository<Group>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const groups = await Promise.all(
      createUserDto.groups.map((name) => this.preloadGroupByName(name)),
    );

    const user = this.userRepository.create({
      ...createUserDto,
      groups,
    });
    return this.userRepository.save(user);
  }

  findAll(paginationQuery: PaginationUserQueryDto) {
    const { limit, loginSubstring } = paginationQuery;
    let options: FindManyOptions<User> = {
      take: limit,
      relations: {
        groups: true,
      },
    };

    if (loginSubstring) {
      options = { ...options, where: { login: Like(`%${loginSubstring}%`) } };
    }
    return this.userRepository.find(options);
  }

  async findOne(id: string) {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException(`User #${id} not found.`);
    }
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const groups =
      updateUserDto.groups &&
      (await Promise.all(
        updateUserDto.groups.map((name) => this.preloadGroupByName(name)),
      ));

    const user = await this.userRepository.preload({
      id: id,
      ...updateUserDto,
      groups,
    });
    if (!user) {
      throw new NotFoundException(`User #${id} not found`);
    }
    return this.userRepository.save(user);
  }

  async remove(id: string) {
    const user = await this.findOne(id);
    if (!user || user.isDeleted) {
      throw new NotFoundException(`User #${id} not found or deleted.`);
    }
    return this.userRepository.update(id, {
      isDeleted: true,
    });
  }

  private async preloadGroupByName(name: string): Promise<Group> {
    const existingGroup = await this.groupsRepository.findOneBy({
      name: name,
    });
    // Create group object if wasn't found.
    return existingGroup ?? this.groupsRepository.create({ name });
  }
}
