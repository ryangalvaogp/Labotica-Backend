import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class usuario1615671311851 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name:'usuarios',
            columns:[
                {
                    name:'usuario_Id',
                    type:'varchar',
                    unsigned:true,
                    isPrimary:true,
                    },
                {
                    name:'name',
                    type:'varchar',
                },
                {
                    name:'funcao',
                    type:'varchar',
                },
                {
                    name:'email',
                    type:'varchar',
                },
                {
                    name:'password',
                    type:'varchar',
                },
                
                
            ]
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('usuarios');
    }

}
