import crypto from 'crypto'
import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import Projetos from '../models/Projetos';
import { getUsuario } from '../config/functions/getUsuario';

export default {
    async index(req: Request, res: Response) {
        const projetosRepository = getRepository(Projetos);
        const projetos = await projetosRepository.find();
        return res.json(projetos);
    },
    async create(req: Request, res: Response) {
        const Authorization = req.headers.authorization;
        const { titulo, descricao, carrousel } = req.body;
        const requestImages = req.files as Express.Multer.File[]
        const images = requestImages.map(image => {
            return {
                id: crypto.randomBytes(3).toString('hex'),
                caminho: image.path,
                imgDefault: false
            }
        })
        const data = {
            projeto_id: crypto.randomBytes(3).toString('hex'),
            usuario_Id: Authorization,
            titulo,
            descricao,
            carrousel,
            images
        };

        try {
            const getOfUsuarioByAuthorization = await getUsuario(Authorization);

            if (getOfUsuarioByAuthorization.funcao === 'Professor'
                || !Authorization
                || Authorization
                !== getOfUsuarioByAuthorization.usuario_Id) {

                const projetosRepository = getRepository(Projetos);
                await projetosRepository.save(data);
                return res.json({ status: "Projeto Cadastrado Com Sucesso", data })
            } else {
                return res.json({ status: "Operação não foi permitida para este usuário" })
            }
        } catch (error) {
            return res.json(error);
        }

    },
    async delete(req: Request, res: Response) {
        const Authorization = req.headers.authorization;
        const { id } = req.params;

        try {
            const getOfUsuarioByAuthorization = await getUsuario(Authorization)
            if (getOfUsuarioByAuthorization.funcao === 'Professor'
                || !Authorization
                || Authorization
                !== getOfUsuarioByAuthorization.usuario_Id) {

                const projetosRepository = getRepository(Projetos);
                await projetosRepository.delete(id);

                return res.status(200).send();

            } else {
                return res.status(401).json(
                    {
                        status: "Operação não foi permitida para este usuário"
                    }
                );
            }
        } catch (error) {
            return res.json(error);
        }
    },
}


