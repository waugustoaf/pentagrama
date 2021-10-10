import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateOfficesCosts1633870383645 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'office_costs',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
          },
          {
            name: 'person_id',
            type: 'uuid',
          },
          {
            name: 'office_id',
            type: 'uuid',
          },
          {
            name: 'hours',
            type: 'numeric',
          },
          {
            name: 'month',
            type: 'numeric',
          },
          {
            name: 'year',
            type: 'numeric',
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
        foreignKeys: [
          {
            columnNames: ['person_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'people',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
          {
            columnNames: ['office_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'offices',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('office_costs');
  }
}
