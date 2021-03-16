import { getRepository } from "typeorm";
import Projetos from "../../models/Projetos";

export async function getProjetoOfUsuarioForValidateWithAuthorization(id: string, Authorization: string | undefined) {
    const projetosRepository = getRepository(Projetos);
    const projeto = (
    await projetosRepository
        .findOneOrFail(
            {
                where: {
                    projeto_id: id,
                    usuario_Id: Authorization
                }
            }
        ));

    return projeto
}
