import { Entity, Column, PrimaryColumn, ManyToOne, JoinColumn} from "typeorm";
import Projetos from "./Projetos";

@Entity({name:'ImgProjetos'})
export default class ImgProjetos {
    @PrimaryColumn()
    id:string;

    @Column()
    caminho:string;

    @Column()
    imgDefault:boolean


    @ManyToOne(()=> Projetos, projeto=>projeto.images)
    @JoinColumn({name:'Projeto_id'})
    projeto: Projetos;

}