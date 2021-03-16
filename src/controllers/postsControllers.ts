import crypto from 'crypto'
import path from 'path'
import fs from 'fs'
import sharp from 'sharp';
import Post from '../models/Posts';
import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { getUsuario } from '../config/functions/getUsuario';
import { getProjetoOfUsuarioForValidateWithAuthorization } from '../config/functions/getProjetoOfUsuarioForValidateWithAuthorization';


export default {

    async index(req: Request, res: Response) {
        const postRepository = getRepository(Post)
        const Posts = await postRepository.find()

        return res.json(Posts)
    },
    async create(req: Request, res: Response) {
        const { description, place } = req.body;
        const usuario_Id = req.headers.authorization
        const { filename: image } = req.file;
        const [name] = image.split('.');
        const filename = `${name}.jpg`;

        await sharp(req.file.path)
            .resize(500)
            .jpeg({ quality: 70, })
            .toFile(
                path.resolve(req.file.destination, 'resized', filename)
            );

        fs.unlinkSync(req.file.path);

        const data = {
            usuario_Id,
            createdAt: Date.now(),
            post_Id: crypto.randomBytes(3).toString('hex'),
            likes: 0,
            description,
            place,
            image: filename
        };

        try {
            const getOfUsuarioByAuthorization = await getUsuario(usuario_Id)
            if (getOfUsuarioByAuthorization.funcao === 'Aluno' || 'Professor' && getOfUsuarioByAuthorization) {
                const postRepository = getRepository(Post)
                await postRepository.save(data);

                return res.status(201).json({ status: "Post Cadastrado Com Sucesso", data })
            } else {
                return res.status(403).json({ status: "Operação não foi permitida para este usuário" })
            }

        } catch (error) {
            return res.status(403).json(error)
        }
    },
    async delete(req: Request, res: Response) {
        const Authorization = req.headers.authorization
        const { id } = req.params

        const getOfUsuarioByAuthorization = await getUsuario(Authorization)

        const projeto = await getProjetoOfUsuarioForValidateWithAuthorization(id, Authorization)

        switch (getOfUsuarioByAuthorization.funcao) {
            case 'Professor':
                const postRepository = getRepository(Post);
                await postRepository.delete(id);

                return res.status(200).send();
            case 'Aluno':
                if (projeto && projeto.usuario_Id === Authorization) {
                    const postRepository = getRepository(Post);
                    await postRepository.delete(id);

                    return res.status(200).send();

                } else {
                    return res.status(403).json({ status: "Operação não foi permitida para este usuário" })
                }
        }


    },
}


