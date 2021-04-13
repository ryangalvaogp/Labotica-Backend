import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import Projetos from '../../models/Projetos';

export default {
    async index(req: Request, res: Response) {
        const projetosRepository = getRepository(Projetos);
        const projetos = await projetosRepository.query(`
        select * from "projetos", "imgProjetos" 
        where "projetos"."projeto_id"="imgProjetos"."Projeto_id"
        and "carrousel"=true
        `);

        const projetosOnCarrousel = projetos.map((projeto: any) => {
            const {
                projeto_id,
                usuario_Id,
                titulo,
                carrousel,
                caminho,
                id,
                url
            } = projeto;

            const data = {
                projeto_id,
                usuario_Id,
                id,
                titulo,
                caminho,
                carrousel: Boolean(carrousel),
                url
            }
            return data;
        })

        return res.status(200).json(projetosOnCarrousel);
    },
};