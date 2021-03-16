import { Request, Response  } from 'express'; 
import { getRepository } from 'typeorm';
import Projetos from '../../models/Projetos';
 
export default {
 
    async allProjetosOfUser (req:Request, res:Response){
        
        const {id} = req.params
        const projetosRepository=getRepository(Projetos)
        const projetos = (await projetosRepository.findOneOrFail(
            {
                relations:["images"],
                where:{
                    usuario_Id:id,
                    
                }
            }
        ))

        return res.json(projetos)
    },
    async imagesOfProjetoOfUser (req:Request, res:Response){
        const {id} = req.params
        const projetosRepository=getRepository(Projetos)
        const projetos = (await projetosRepository.findOneOrFail(
            {
                relations:["images"],
                where:{
                    projeto_id:id,
                    
                }
            }
        ))

        return res.json(projetos.images)
    },
    async delete (req:Request, res:Response){
 
    },
}