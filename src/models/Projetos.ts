import {Column, PrimaryColumn, Entity, OneToMany, JoinColumn} from 'typeorm'
import ImgProjetos from './Image';


@Entity({name:'projetos'})
export default class Projetos {
   @PrimaryColumn('varchar')
    projeto_id:string;

    @Column('varchar')
    titulo:string;

    @Column('varchar')
    descricao:string;

    @Column('varchar')
    carrousel:string;

    @Column('varchar')
    usuario_Id:string

    @OneToMany(()=> ImgProjetos, img=> img.projeto,
    {
        cascade:['insert', 'update'],
        onUpdate:'CASCADE',
        onDelete:'CASCADE',

    })
    @JoinColumn({name:'Projeto_id'})
    images:ImgProjetos[];
    
}