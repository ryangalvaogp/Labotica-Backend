import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class imgProjetos1615689999270 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name:'imgProjetos',
            columns:[
                {
                    name:'id',
                    type:'varchar',
                    isPrimary:true,
                },
                {
                    name:'caminho',
                    type:'varchar',
                },
                {
                    name:'imgDefault',
                    type:'boolean'
                },
                {
                    name:'Projeto_id',
                    type:'varchar'
                },
            ],
            foreignKeys:[
                {
                    name:'projeto_id',
                    columnNames:['projeto_id'],
                    referencedTableName:'projetos',
                    referencedColumnNames:['projeto_id'],
                    onDelete:'CASCADE',
                    onUpdate:'CASCADE',
                }
            ]
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('imgProjetos')
    }

}
