import { Entity, Column, PrimaryColumn, ManyToOne, JoinColumn} from "typeorm";
import Projetos from "./Projetos";
@Entity({name:'imgProjetos'})
export default class ImgProjetos {
    @PrimaryColumn()
    id:string;

    @Column()
    caminho:string;

    @Column()
    imgDefault:boolean;

    @Column()
    url:string;

    @ManyToOne(()=> Projetos, projeto=>projeto.images)
    @JoinColumn({name:'Projeto_id'})
    projeto: Projetos;
};