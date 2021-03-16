import { Request, Response  } from 'express'; 
import { Login } from '../config/functions/getUsuario';
 
export default {
 
    async Login (req:Request, res:Response){
        const data = req.body;

        const usuario = await Login(data)
        
        return res.json(usuario)
    },
    async create (req:Request, res:Response){
 
    },
    async delete (req:Request, res:Response){
 
    },
}