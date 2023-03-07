import { Test, TestingModule } from '@nestjs/testing';
import { GroupsController } from './groups.controller';
import { GroupsService } from './groups.service';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { faker } from '@faker-js/faker';
import { Permission } from './enums/perminssion.enum';
import { AddUserDto } from './dto/add-user.dto';

const firstGroupUuid = faker.datatype.uuid();
const firstGroup: CreateGroupDto = {
  name: faker.internet.userName(),
  permissions: [Permission.READ],
};

const secondGroupUuid = faker.datatype.uuid();
const secondGroup: CreateGroupDto = {
  name: faker.internet.userName(),
  permissions: [Permission.UPLOAD_FILES],
};

const updateGroupDto: UpdateGroupDto = {
  permissions: [Permission.WRITE],
};

const addUserDto: AddUserDto = {
  users: [faker.datatype.uuid()],
};

describe('GroupsController', () => {
  let groupsController: GroupsController;
  let groupsService: GroupsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GroupsController],
      providers: [
        GroupsService,
        {
          provide: GroupsService,
          useValue: {
            create: jest.fn().mockImplementation((group: CreateGroupDto) =>
              Promise.resolve({
                id: firstGroupUuid,
                ...group,
              }),
            ),
            findAll: jest.fn().mockResolvedValue([firstGroup, secondGroup]),
            findOne: jest.fn().mockImplementation((id: string) =>
              Promise.resolve({
                id,
                ...firstGroup,
              }),
            ),
            update: jest
              .fn()
              .mockImplementation(
                (id: string, updateGroupDto: UpdateGroupDto) =>
                  Promise.resolve({
                    id,
                    ...updateGroupDto,
                  }),
              ),
            remove: jest.fn().mockReturnValue(true),
            addUser: jest
              .fn()
              .mockImplementation((id: string, addUserDto: AddUserDto) =>
                Promise.resolve({
                  id,
                  ...firstGroup,
                  ...addUserDto,
                }),
              ),
          },
        },
      ],
    }).compile();

    groupsController = module.get<GroupsController>(GroupsController);
    groupsService = module.get<GroupsService>(GroupsService);
  });

  it('should be defined', () => {
    expect(groupsController).toBeDefined();
  });

  describe('create()', () => {
    it('should create a group', () => {
      groupsController.create(firstGroup);
      expect(groupsController.create(firstGroup)).resolves.toEqual({
        id: firstGroupUuid,
        ...firstGroup,
      });
      expect(groupsService.create).toHaveBeenCalledWith(firstGroup);
    });
  });

  describe('findAll()', () => {
    it('should find all groups ', () => {
      groupsController.findAll();
      expect(groupsService.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne()', () => {
    it('should find a group', () => {
      const res = groupsController.findOne(firstGroupUuid);
      expect(groupsController.findOne(firstGroupUuid)).resolves.toEqual({
        id: firstGroupUuid,
        ...firstGroup,
      });
      expect(groupsService.findOne).toHaveBeenCalledWith(firstGroupUuid);
    });
  });

  describe('update()', () => {
    it('should update a group', () => {
      groupsController.update(firstGroupUuid, updateGroupDto);
      expect(
        groupsController.update(firstGroupUuid, updateGroupDto),
      ).resolves.toEqual({
        id: firstGroupUuid,
        ...updateGroupDto,
      });
      expect(groupsService.update).toHaveBeenCalledWith(
        firstGroupUuid,
        updateGroupDto,
      );
    });
  });

  describe('remove()', () => {
    it('should remove the group', () => {
      groupsController.remove(secondGroupUuid);
      expect(groupsService.remove).toHaveBeenCalledWith(secondGroupUuid);
    });
  });

  describe('addUser()', () => {
    it('should add user to the group', () => {
      groupsController.addUser(firstGroupUuid, addUserDto);
      expect(
        groupsController.addUser(firstGroupUuid, addUserDto),
      ).resolves.toEqual({
        id: firstGroupUuid,
        ...firstGroup,
        ...addUserDto,
      });
      expect(groupsService.addUser).toHaveBeenCalledWith(
        firstGroupUuid,
        addUserDto,
      );
    });
  });
});
