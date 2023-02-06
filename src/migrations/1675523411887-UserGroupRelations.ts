import { MigrationInterface, QueryRunner } from 'typeorm';

export class UserGroupRelations1675523411887 implements MigrationInterface {
  name = 'UserGroupRelations1675523411887';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "user_groups_group" ("userId" uuid NOT NULL, "groupId" uuid NOT NULL, CONSTRAINT "PK_98d481413dbe5578ad2a45ab863" PRIMARY KEY ("userId", "groupId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_84ff6a520aee2bf2512c01cf46" ON "user_groups_group" ("userId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_8abdfe8f9d78a4f5e821dbf620" ON "user_groups_group" ("groupId") `,
    );
    await queryRunner.query(
      `ALTER TABLE "user_groups_group" ADD CONSTRAINT "FK_84ff6a520aee2bf2512c01cf462" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_groups_group" ADD CONSTRAINT "FK_8abdfe8f9d78a4f5e821dbf6203" FOREIGN KEY ("groupId") REFERENCES "group"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user_groups_group" DROP CONSTRAINT "FK_8abdfe8f9d78a4f5e821dbf6203"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_groups_group" DROP CONSTRAINT "FK_84ff6a520aee2bf2512c01cf462"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_8abdfe8f9d78a4f5e821dbf620"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_84ff6a520aee2bf2512c01cf46"`,
    );
    await queryRunner.query(`DROP TABLE "user_groups_group"`);
  }
}
