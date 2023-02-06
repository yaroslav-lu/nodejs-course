import { User } from 'src/users/entities/user.entity';
import { MigrationInterface, QueryRunner } from 'typeorm';
import { faker } from '@faker-js/faker';

export class SeedUser1675522744885 implements MigrationInterface {
  name = 'SeedUser1675522744885';

  public async up(queryRunner: QueryRunner): Promise<void> {
    let i = 0;
    while (i < 10) {
      await queryRunner.manager.save(
        queryRunner.manager.create<User>(User, {
          login: faker.internet.userName(),
          password: faker.internet.password(20, true, /[a-zA-Z]/),
          age: faker.datatype.number({ min: 4, max: 130 }),
        }),
      );
      i++;
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.clearTable('user');
  }
}
