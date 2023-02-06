import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import { Group } from './src/groups/entities/group.entity';
import { User } from './src/users/entities/user.entity';
import { UserTable1675522744884 } from './src/migrations/1675522744884-UserTable';
import { SeedUser1675522744885 } from './src/migrations/1675522744885-SeedUser';
import { GroupTable1675523034548 } from './src/migrations/1675523034548-GroupTable';
import { UserGroupRelations1675523411887 } from './src/migrations/1675523411887-UserGroupRelations';

dotenv.config();

export default new DataSource({
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  port: parseInt(process.env.DATABASE_PORT, 10) || 5432,
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  entities: [User, Group],
  migrations: [
    UserTable1675522744884,
    SeedUser1675522744885,
    GroupTable1675523034548,
    UserGroupRelations1675523411887,
  ],
});
