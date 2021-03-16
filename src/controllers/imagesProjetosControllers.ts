import { Request, Response } from 'express';
import { getRepository } from 'typeorm';

import ImgProjetos from '../models/Image'

export default {
async  index(req: Request, res: Response) {
    const imagesProjetosRepository = getRepository(ImgProjetos);
    const Images = await imagesProjetosRepository.find();

    return res.json(Images);
},
    async showImages(req: Request, res: Response) {
        const { id } = req.params;

        const imagesProjetosRepository = getRepository(ImgProjetos);
        const Images = await imagesProjetosRepository.find({where:[{projeto:id}]})

        return res.json(Images)

    }
}