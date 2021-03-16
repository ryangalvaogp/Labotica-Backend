import {Entity, Column, PrimaryColumn, ManyToOne, JoinColumn} from 'typeorm'
import Usuarios from './Usuarios';




@Entity({name:'post'})
export default class Post {
    
    @PrimaryColumn()
    post_Id:string;

    @Column()
    usuario_Id:string
    @Column()
    description:string;

    @Column()
    place:string;

    @Column()
    image:string;
    @Column()
    createdAt:Date;

    @Column()
    likes:number;    

    @ManyToOne(()=> Usuarios, usuario=>usuario.posts)
    @JoinColumn({name:'usuario_Id'})
    usuario: Usuarios;


}