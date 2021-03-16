import crypto from 'crypto'
import {Request, Response} from 'express'
import { getRepository } from "typeorm";
import Usuarios from '../models/Usuarios';



export default {
    async index(req:Request ,res:Response) {
        
        const usuariosRepository = getRepository(Usuarios);
        const usuarios = await usuariosRepository.find();
        
        return res.json(usuarios)
    },
    async create(req:Request ,res:Response){
        const {name, email, password, funcao}= req.body;
        
        let data ={
            usuario_Id:crypto.randomBytes(3).toString('hex'),
            name, 
            email, 
            password, 
            funcao            
        }


        const usuariosRepository = getRepository(Usuarios);
        const usuario = usuariosRepository.create(data);

        await usuariosRepository.save(usuario)

        return res.status(201).json({status:"Usuário Cadastrado Com Sucesso",usuario})
    },
    async delete (req:Request, res:Response){
        const {id} = req.params;

        const usuariosRepository = getRepository(Usuarios);
         await usuariosRepository.delete(id)

        return res.status(200).send()
    }
}