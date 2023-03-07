import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { faker } from '@faker-js/faker';
import { PaginationUserQueryDto } from './dto/pagination-user-query.dto';
import { UpdateUserDto } from './dto/update-user.dto';

const firstUserUuid = faker.datatype.uuid();
const firstUser: CreateUserDto = {
  login: faker.internet.userName(),
  password: faker.internet.password(20, true, /[a-zA-Z]/),
  age: faker.datatype.number({ min: 4, max: 130 }),
  groups: [],
};

const secondUserUuid = faker.datatype.uuid();
const secondUser: CreateUserDto = {
  login: faker.internet.userName(),
  password: faker.internet.password(20, true, /[a-zA-Z]/),
  age: faker.datatype.number({ min: 4, max: 130 }),
  groups: [],
};

const updateUserDto: UpdateUserDto = {
  login: faker.internet.userName(),
  age: faker.datatype.number({ min: 4, max: 130 }),
};

const paginationUserQueryDto: PaginationUserQueryDto = {
  loginSubstring: '',
  limit: 100,
};

describe('UsersController', () => {
  let usersController: UsersController;
  let usersService: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        UsersService,
        {
          provide: UsersService,
          useValue: {
            create: jest.fn().mockImplementation((user: CreateUserDto) =>
              Promise.resolve({
                id: firstUserUuid,
                isDeleted: false,
                ...user,
              }),
            ),
            findAll: jest.fn().mockResolvedValue([firstUser, secondUser]),
            findOne: jest.fn().mockImplementation((id: string) =>
              Promise.resolve({
                id,
                isDeleted: false,
                ...firstUser,
              }),
            ),
            update: jest
              .fn()
              .mockImplementation((id: string, updateUserDto: UpdateUserDto) =>
                Promise.resolve({
                  id,
                  isDeleted: false,
                  ...updateUserDto,
                }),
              ),
            remove: jest.fn().mockImplementation((id: string) =>
              Promise.resolve({
                id,
                isDeleted: true,
                ...secondUser,
              }),
            ),
          },
        },
      ],
    }).compile();

    usersController = module.get<UsersController>(UsersController);
    usersService = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(usersController).toBeDefined();
  });

  describe('create()', () => {
    it('should create a user', () => {
      usersController.create(firstUser);
      expect(usersController.create(firstUser)).resolves.toEqual({
        id: firstUserUuid,
        isDeleted: false,
        ...firstUser,
      });
      expect(usersService.create).toHaveBeenCalledWith(firstUser);
    });
  });

  describe('findAll()', () => {
    it('should find all users ', () => {
      usersController.findAll(paginationUserQueryDto);
      expect(usersService.findAll).toHaveBeenCalledWith(paginationUserQueryDto);
    });
  });

  describe('findOne()', () => {
    it('should find a user', () => {
      expect(usersController.findOne(firstUserUuid)).resolves.toEqual({
        id: firstUserUuid,
        isDeleted: false,
        ...firstUser,
      });
      expect(usersService.findOne).toHaveBeenCalledWith(firstUserUuid);
    });
  });

  describe('update()', () => {
    it('should update a user', () => {
      usersController.update(firstUserUuid, updateUserDto);
      expect(
        usersController.update(firstUserUuid, updateUserDto),
      ).resolves.toEqual({
        id: firstUserUuid,
        isDeleted: false,
        ...updateUserDto,
      });
      expect(usersService.update).toHaveBeenCalledWith(
        firstUserUuid,
        updateUserDto,
      );
    });
  });

  describe('remove()', () => {
    it('should soft remove the user', () => {
      usersController.remove(secondUserUuid);
      expect(usersController.remove(secondUserUuid)).resolves.toEqual({
        id: secondUserUuid,
        isDeleted: true,
        ...secondUser,
      });
      expect(usersService.remove).toHaveBeenCalledWith(secondUserUuid);
    });
  });
});
