import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import ImgProjetos from '../../models/Image';
import Projetos from '../../models/Projetos';

export default {
    async allProjetosOfUser(req: Request, res: Response) {
        const { id } = req.params;
        const projetosRepository = getRepository(Projetos);
       
       try {
        const projetos = (await projetosRepository.findOneOrFail(
            {
                relations: ["images"],
                where: {
                    usuario_Id: id,
                }
            }
        ));
        return res.json(projetos);
       } catch (error) {
        return res.json(error);
       }
       
    },
    async imagesOfProjetoOfUser(req: Request, res: Response) {
        const { id } = req.params
        const projetosRepository = getRepository(Projetos)
        const projetos = (await projetosRepository.findOneOrFail(
            {
                relations: ["images"],
                where: {
                    projeto_id: id,
                }
            }
        ));
        return res.json(projetos.images);
    },
    async listProjetos(req: Request, res: Response) {
        try {
            const imagesProjetosRepository = getRepository(ImgProjetos);
            const Images = await imagesProjetosRepository.find({
                relations: ["projeto"],
                where: {
                    imgDefault: true
                }
            });
            return res.json(Images);
        } catch (error) {
            return res.json(error);
        };
    },
};