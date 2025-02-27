import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateClientsTable1740618911825 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS "clients" (
              "id" SERIAL PRIMARY KEY,
              "name" VARCHAR(255) NOT NULL,
              "ref" VARCHAR(255) UNIQUE NOT NULL,
              "created_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
          `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE IF EXISTS "clients";');
  }
}
