import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class BookMigration1631689667648 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'book',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
          },
          {
            name: 'title',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'author',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'created_at',
            type: 'TIMESTAMP',
            isNullable: false,
            default: 'NOW()',
          },
          {
            name: 'updated_at',
            type: 'TIMESTAMP',
            isNullable: false,
            default: 'NOW()',
          },
        ],
      }),
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.getTable('book')
    await queryRunner.dropTable('book')
  }
}
