import { getRepository } from 'typeorm';
import Usuarios from '../../models/Usuarios';
import { Usuario } from '../../types/usuario'

export async function getUsuario(Authorization: string | undefined) {
    const usuarioRepository = getRepository(Usuarios);

    const getOfUsuarioByAuthorization = (
        await usuarioRepository
            .findOneOrFail(
                {
                    where: [
                        {
                            usuario_Id: Authorization,
                        }
                    ]
                }
            )
    );
    return getOfUsuarioByAuthorization;
};

export async function listAllUsuarios() {
    const usuarioRepository = getRepository(Usuarios);
    const allUsuario = await usuarioRepository.find();

    return allUsuario;
};

export async function Login({ email, password }: Usuario) {
    const usuarioRepository = getRepository(Usuarios);
    const usuario = (
        await usuarioRepository.findOneOrFail(
            {
                where: {
                    email: email,
                    password: password
                },
                select:['name','usuario_Id','funcao', 'matricula']
            }
        )
    );
    return usuario;
};