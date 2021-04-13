import { MigrationInterface, QueryRunner, Table } from "typeorm";
export class post1615690666984 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'post',
            columns: [
                {
                    name:'post_Id',
                    type:'varchar',
                    isPrimary:true
                },
                {
                    name: 'usuario_Id',
                    type: 'varchar',
                },
                {
                    name: 'titulo',
                    type: 'varchar'
                },
                {
                    name: 'description',
                    type: 'text'
                },
                {
                    name: 'place',
                    type: 'varchar'
                },
                {
                    name: 'image',
                    type: 'varchar'
                },
                {
                    name: 'createdAt',
                    type: 'date'
                },
                {
                    name:'url',
                    type:'varchar'
                },
            ],
            foreignKeys: [
                {
                    name: 'usuario_Id',
                    columnNames: ['usuario_Id'],
                    referencedTableName: 'usuarios',
                    referencedColumnNames: ['usuario_Id'],
                    onDelete: 'CASCADE',
                    onUpdate: 'CASCADE'
                }
            ],
        }))
    };

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('post')
    };
};