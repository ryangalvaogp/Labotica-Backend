import crypto from 'crypto'

import dotenv from 'dotenv'
import path from 'path'
import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import Projetos from '../models/Projetos';
import { getUsuario } from '../config/functions/getUsuario';
import ImgProjetos from '../models/Image';
import { DeleteImageInAwS3 } from '../config/functions/DeleteImageInAwS3';

dotenv.config();
export default {
    async index(req: Request, res: Response) {
        const projetosRepository = getRepository(Projetos);
        const projetos = await projetosRepository.find();
        return res.json(projetos);
    },
    async show(req: Request, res: Response) {
        const { id } = req.params;

        const projetosRepository = getRepository(Projetos);
        const projeto = await projetosRepository.find(
            {
                where: {
                    projeto_id: id
                }
            });
        return res.json(projeto);
    },
    async create(req: Request, res: Response) {
        const Authorization = req.headers.authorization;
        const { titulo, descricao, carrousel } = req.body;

        const requestImages = req.files as Express.Multer.File[]

        const images = requestImages.map(image => {

            const {
                //@ts-expect-error
                key: caminho,//@ts-expect-error
                location: url = ''
            } = image;

            return {
                id: crypto.randomBytes(3).toString('hex'),
                caminho,
                imgDefault: false,
                url,
            };
        });
        const data = {
            projeto_id: crypto.randomBytes(3).toString('hex'),
            usuario_Id: Authorization,
            titulo,
            descricao,
            carrousel,
            images,
        };

        try {
            const getOfUsuarioByAuthorization = await getUsuario(Authorization);

            if (getOfUsuarioByAuthorization.funcao === 'Professor'
                || !Authorization
                || Authorization
                !== getOfUsuarioByAuthorization.usuario_Id) {

                const projetosRepository = getRepository(Projetos);
                await projetosRepository.save(data);
                return res.json({ status: "Projeto Cadastrado Com Sucesso", data });
            } else {
                return res.json({ status: "Operação não foi permitida para este usuário" });
            };
        } catch (error) {
            return res.json(error);
        };
    },
    async delete(req: Request, res: Response) {
        const Authorization = req.headers.authorization;
        const { id } = req.params;

        try {
            const getOfUsuarioByAuthorization = await getUsuario(Authorization);
            if (getOfUsuarioByAuthorization.funcao === 'Professor'
                || !Authorization
                || Authorization
                !== getOfUsuarioByAuthorization.usuario_Id) {

                const projetosRepository = getRepository(Projetos);
                const imgRepository = getRepository(ImgProjetos);

                const images = await imgRepository.query(`
                select "caminho"
                from "projetos", "imgProjetos"
                where "imgProjetos"."Projeto_id" = '${id}'
                and "projetos"."projeto_id" = "imgProjetos"."Projeto_id"
                `);
                
                try {
                    (await images).map((image: ImgProjetos) => {
                        DeleteImageInAwS3(image.caminho);
                    });
                    await projetosRepository.delete(id);

                    return res.status(200).send();
                } catch (error) {
                    return res.status(400).send(error);
                };
            } else {
                return res.status(401).json(
                    {
                        status: "Operação não foi permitida para este usuário",
                    }
                );
            };
        } catch (error) {
            return res.json(error);
        };
    },
    async toCarrousel(req: Request, res: Response) {
        const { id } = req.params;
        const { carrousel } = req.body;

        try {
            const projetosRepository = getRepository(Projetos);
            await projetosRepository.update({ projeto_id: id }, {
                carrousel,
            });

            return res.status(200).json(projetosRepository);
        } catch (error) {
            return res.status(200).json(error);
        };
    },
};