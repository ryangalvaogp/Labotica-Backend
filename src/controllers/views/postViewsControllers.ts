import { Request, Response } from 'express';
import { DateTime } from 'luxon';
import { getRepository } from 'typeorm'
import Post from '../../models/Posts';

export default {
    async listAllPostsAlunos(req: Request, res: Response) {
        const PostRepository = getRepository(Post);
        const posts = await PostRepository.query(
            `select "post_Id",
            "titulo",
            "createdAt",
            "description",
            "place",
            "url"
            "name",
            "funcao",
            "email",
            "image" 
            from "post", "usuarios" 
            where "post"."usuario_Id"="usuarios"."usuario_Id" 
            and "usuarios"."funcao"='Aluno'`
        );

        let allPostAlunos = posts.map((post: any) => {
            const {
                post_Id,
                titulo,
                description,
                place,
                image,
                createdAt,
                name,
                funcao,
                email,
                url
            } = post;

            const dataS = {
                post_Id,
                titulo,
                description,
                place,
                usuario: {
                    name,
                    funcao,
                    email,
                },
                image,
                data: DateTime
                    .fromISO(new Date(createdAt).toISOString())
                    .toLocaleString(DateTime.DATETIME_SHORT),
                url,
            }
            return dataS;
        });
        return res.json(allPostAlunos);
    },
    async listAllPostsProfessores(req: Request, res: Response) {
        const PostRepository = getRepository(Post);
        const posts = await PostRepository.query(
            `select "post_Id",
            "titulo",
            "createdAt",
            "description",
            "place",
            "name",
            "funcao",
            "email",
            "image",
            "url"
            from "post", "usuarios" 
            where "post"."usuario_Id"="usuarios"."usuario_Id" 
            and "usuarios"."funcao"='Professor'`
        );

        let allPostProfessor = posts.map((post: any) => {
            const {
                post_Id,
                titulo,
                description,
                place,
                image,
                name,
                funcao,
                email,
                createdAt,
                url,
            } = post;

            const dataS = {
                post_Id,
                titulo,
                description,
                place,
                usuario: {
                    name,
                    funcao,
                    email,
                },
                image,
                data: DateTime
                    .fromISO(new Date(createdAt).toISOString())
                    .toLocaleString(DateTime.DATETIME_SHORT),
                url,
            }
            return dataS;
        })
        return res.json(allPostProfessor);
    },
};