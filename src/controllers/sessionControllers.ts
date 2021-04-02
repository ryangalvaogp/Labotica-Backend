import { Request, Response } from 'express';
import { Login } from '../config/functions/getUsuario';

export default {
    async Login(req: Request, res: Response) {
        const data = req.body;

        try {
            const usuario = await Login(data);
            return res.json(usuario);
        } catch (error) {
            switch (error.name) {
                case 'EntityNotFound':
                    return res.status(406).json(
                        {
                            resume: "Esta conta não existe"
                        }
                    );
            };
            return res.json(error);
        };
    },
};