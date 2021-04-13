import crypto from 'crypto'
import path from 'path'
import fs from 'fs'
import sharp from 'sharp';
import Post from '../models/Posts';
import { DateTime, } from 'luxon'
import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { getUsuario } from '../config/functions/getUsuario';
import { getPostOfUsuarioForValidateWithAuthorization, getProjetoOfUsuarioForValidateWithAuthorization } from '../config/functions/getProjetoOfUsuarioForValidateWithAuthorization';
import Usuarios from '../models/Usuarios';
import { DeleteImageInAwS3 } from '../config/functions/DeleteImageInAwS3';

export default {
    async index(req: Request, res: Response) {
        const postRepository = getRepository(Post);
        const Posts = await postRepository.find(
            {
                relations: ['usuario'],
                order: { createdAt: 'DESC' },
            }
        );
        const data = Posts.map(post => {
            const {
                createdAt,
                description,
                image,
                place,
                post_Id,
                titulo,
                url
            } = post;

            const {
                name,
                funcao,
                email
            } = post.usuario;

            let dataSelected = {
                post_Id,
                titulo,
                description,
                place,
                Usuario: {
                    name,
                    funcao,
                    email,
                },
                image,
                data: DateTime
                    .fromISO(createdAt.toISOString())
                    .toLocaleString(DateTime.DATETIME_SHORT),
                url,
            }
            return dataSelected;
        });
        return res.json(data);
    },
    async create(req: Request, res: Response) {
        const {
            titulo,
            description,
            place,
        } = req.body;

        const usuario_Id = req.headers.authorization;//@ts-ignore
        const {
            //@ts-expect-error
            key: filename, //@ts-expect-error
            location: url = ''
        } = req.file;

        const data = {
            usuario_Id,
            createdAt: DateTime.now().toISO(),
            post_Id: crypto.randomBytes(3).toString('hex'),
            titulo,
            description,
            place,
            image: filename,
            url,
        };

        try {
            const getOfUsuarioByAuthorization = await getUsuario(usuario_Id);
            if (getOfUsuarioByAuthorization.funcao
                === 'Aluno'
                || 'Professor'
                && getOfUsuarioByAuthorization) {
                const postRepository = getRepository(Post);
                await postRepository.save(data);

                return res.status(201).json(
                    {
                        status: "Post Cadastrado Com Sucesso",
                        data,
                    }
                );
            } else {
                return res.status(403).json(
                    {
                        status: "Operação não foi permitida para este usuário"
                    }
                );
            };
        } catch (error) {
            return res.status(403).json(error);
        };

    },
    async delete(req: Request, res: Response) {
        const Authorization = req.headers.authorization;
        const { id } = req.params;

        const getOfUsuarioByAuthorization = await getUsuario(Authorization);
        const projeto = await getPostOfUsuarioForValidateWithAuthorization(id, Authorization);

        switch (getOfUsuarioByAuthorization.funcao) {
            case 'Professor':
                const postRepository = getRepository(Post);
                const deletePostImages = postRepository.find(
                    {
                        where: {
                            post_Id: id,
                        },
                        select: ['image', 'usuario_Id'],
                    }
                );
                try {
                    (await deletePostImages).map((image) => {
                        DeleteImageInAwS3(image.image);
                    });
                    await postRepository.delete(id);

                    return res.status(200).send();
                } catch (error) {
                    return res.status(400).send(error);
                };

            case 'Aluno':
                if (projeto && projeto.usuario_Id === Authorization) {
                    const postRepository = getRepository(Post);
                    const deletePostImages = postRepository.find(
                        {
                            where: {
                                post_Id: id,
                                usuario_Id: Authorization,
                            },
                            select: ['image', 'usuario_Id'],
                        }
                    );
                    try {
                        (await deletePostImages).map((image) => {
                           DeleteImageInAwS3(image.image)
                        });
                        await postRepository.delete(id);

                        return res.status(200).send();
                    } catch (error) {
                        return res.status(400).send(error);
                    };
                } else {
                    return res.status(403).json(
                        {
                            status: "Operação não foi permitida para este usuário",
                        }
                    );
                };
        };
    },
    async postUser(req: Request, res: Response) {
        const { id } = req.params;

        const postRepository = getRepository(Post);
        const Posts = await postRepository.find(
            {
                where: {
                    usuario_Id: id,
                },
                order: {
                    createdAt: 'DESC',
                }
            }
        );

        const usuarioRepository = getRepository(Usuarios);
        const userById = await usuarioRepository.find({
            where: {
                usuario_Id: id,
            }
        });
        const usuario = userById[0];

        const postUser = Posts.map(post => {
            const {
                post_Id,
                titulo,
                description,
                place,
                image,
                url
            } = post;

            let dataSelected = {
                post_Id,
                titulo,
                description,
                place,
                usuario,
                image,
                data: DateTime
                    .fromISO(post.createdAt.toISOString())
                    .toLocaleString(DateTime.DATETIME_SHORT),
                url,
            };
            return dataSelected;
        });
        return res.json(postUser);
    },
};

