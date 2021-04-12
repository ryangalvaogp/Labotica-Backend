import { Entity, Column, PrimaryColumn, OneToMany, JoinColumn } from "typeorm";
import Post from "./Posts";
@Entity({name:'usuarios'})
export default class Usuarios {
    @PrimaryColumn('varchar')
    usuario_Id: string;
    
    @Column('varchar')
    matricula:number;

    @Column('varchar')
    name: string;

    @Column('varchar')
    funcao: string;

    @Column('varchar')
    email: string;

    @Column('varchar', {select:false})
    password: string;

    @OneToMany(()=> Post, Post=> Post.usuario,
    {
        cascade:['insert', 'update'],
        onUpdate:'CASCADE',
        onDelete:'CASCADE',
    })
    @JoinColumn({name:'usuario_Id'})
    posts:Post[];
};