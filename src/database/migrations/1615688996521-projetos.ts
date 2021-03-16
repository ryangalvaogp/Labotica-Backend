import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class projetos1615688996521 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name:'projetos',
            columns:[
                {
                    name:'projeto_id',
                    type:'varchar',
                    isPrimary:true,
                    },
                {
                    name:'titulo',
                    type:'varchar',
                },
                {
                    name:'descricao',
                    type:'varchar',
                },
                {
                    name:'carrousel',
                    type:'boolean'
                },
                {
                    name:'usuario_Id',
                    type: 'varchar'
                }
            ],
        foreignKeys:[
            {
                columnNames:['usuario_Id'],
                referencedTableName:'usuarios',
                referencedColumnNames:['usuario_Id'],
                name:'usuario_Id',
                onDelete:'CASCADE',
                onUpdate:'CASCADE'
            }
        ],
        
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('projetos')
    }

}
