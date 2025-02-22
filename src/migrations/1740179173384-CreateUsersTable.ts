import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUsersTable1740179173384 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
          CREATE TABLE IF NOT EXISTS "users" (
            "id" SERIAL PRIMARY KEY,
            "name" VARCHAR(255) NOT NULL,
            "email" VARCHAR(255) UNIQUE NOT NULL,
            "password" VARCHAR(255) NOT NULL,
            "created_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
          );
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE IF EXISTS "users";');
  }
}
