import { getRepository } from 'typeorm';
import Usuarios from '../../models/Usuarios';


export async function getUsuario(Authorization: string | undefined) {
    
const usuarioRepository = getRepository(Usuarios);
   
const getOfUsuarioByAuthorization = (
        await usuarioRepository
            .findOneOrFail(
                {
                    where: [
                        {
                            usuario_Id: Authorization
                        }
                    ]
                }
            )
    );
    return getOfUsuarioByAuthorization;
}

export async  function listAllUsuarios() {
    const usuarioRepository = getRepository(Usuarios);
     const allUsuario = usuarioRepository.find()

     return allUsuario
}