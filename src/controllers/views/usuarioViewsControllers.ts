import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import Usuarios from '../../models/Usuarios';

export default {
    async listAllAlunos(req: Request, res: Response) {
        try {
            const usuarioRepository = getRepository(Usuarios);
            const aluno = await usuarioRepository.find({
                where: {
                    funcao: 'Aluno',
                }
            })
            return res.status(200).json(aluno);
        } catch (error) {
            return res.json(error.message);
        };
    },
    async listAllProfessores(req: Request, res: Response) {
        try {
            const usuarioRepository = getRepository(Usuarios)
            const aluno = await usuarioRepository.find({
                where: {
                    funcao: 'Professor',
                }
            });
            return res.status(200).json(aluno);
        } catch (error) {
            return res.json(error.message);
        };
    },
};