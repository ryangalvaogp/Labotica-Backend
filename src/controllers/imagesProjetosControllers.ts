import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import ImgProjetos from '../models/Image'

export default {
    async index(req: Request, res: Response) {
        try {
            const imagesProjetosRepository = getRepository(ImgProjetos);
            const Images = await imagesProjetosRepository.find({
                relations: ["projeto"],
            });
            return res.json(Images);
        } catch (error) {
            return res.json(error);
        };
    },
    async showImages(req: Request, res: Response) {
        const { id } = req.params;

        const imagesProjetosRepository = getRepository(ImgProjetos);
        const Images = await imagesProjetosRepository.find({
            where: [
                {
                    projeto: id,
                }
            ]
        });
        return res.json(Images);
    },
    async setImageDefault(req: Request, res: Response) {
        const { id } = req.params;
        const { isDefault: imgDefault } = req.body;

        const imagesProjetosRepository = getRepository(ImgProjetos);
        await imagesProjetosRepository.update({ id: id }, {
            imgDefault,
        })
        return res.json({ status: "Modificado com Sucesso" });
    },
};