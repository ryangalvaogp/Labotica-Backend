import crypto from 'crypto'
import { Request, Response } from 'express'
import { getRepository } from "typeorm";
import Usuarios from '../models/Usuarios';

export default {
    async index(req: Request, res: Response) {
        const usuariosRepository = getRepository(Usuarios);
        const users = await usuariosRepository.find();

        const usuarios = users.map((user: Usuarios) => {
            const {
                email,
                funcao,
                matricula,
                name,
                usuario_Id
            } = user;

            let data = {
                usuario_Id,
                name,
                email,
                funcao,
                matricula: Number(matricula),
            }
            return data;
        });
        return res.json(usuarios);
    },
    async create(req: Request, res: Response) {
        const {
            name,
            email,
            matricula,
            password,
            funcao
        } = req.body;

        let data = {
            usuario_Id: crypto.randomBytes(3).toString('hex'),
            name,
            email,
            password,
            funcao,
            matricula,
        };

        const usuariosRepository = getRepository(Usuarios);
        const usuario = usuariosRepository.create(data);
        await usuariosRepository.save(usuario);

        return res.status(201).json({ status: "Usuário Cadastrado Com Sucesso", usuario });
    },
    async delete(req: Request, res: Response) {
        const { id } = req.params;

        const usuariosRepository = getRepository(Usuarios);
        await usuariosRepository.delete(id);

        return res.status(200).send();
    },
    async update(req: Request, res: Response) {
        const { id } = req.params;
        const { name, email } = req.body;

        try {
            const usuariosRepository = getRepository(Usuarios);

            if (name && !email) {
                await usuariosRepository.update({ usuario_Id: id }, {
                    name,
                },
                );
                return res.status(200).json(
                    {
                        Status: "Informações Atualizadas",
                        Data: name,
                    },
                );
            };
            if (!name && email) {
                await usuariosRepository.update({ usuario_Id: id }, {
                    email,
                }
                );
                return res.status(200).json(
                    {
                        Status: "Informações Atualizadas",
                        Data: email,
                    },
                );
            };
            if (name && email) {
                await usuariosRepository.update(
                    { usuario_Id: id }, {
                    name,
                    email,
                },
                );
                return res.status(200).json(
                    {
                        Status: "Informações Atualizadas",
                        Data: {
                            name,
                            email,
                        },
                    },
                );
            };
        } catch (error) {
            return res.json(error);
        };
    },
    async updatePassword(req: Request, res: Response) {
        const { id } = req.params;
        const { password } = req.body;

        try {
            const usuariosRepository = getRepository(Usuarios);
            await usuariosRepository.update({ usuario_Id: id }, {
                password,
            });
            return res.json({ status: "Password alterado com sucesso" });
        } catch (error) {
            return res.json(error);
        };
    },
};