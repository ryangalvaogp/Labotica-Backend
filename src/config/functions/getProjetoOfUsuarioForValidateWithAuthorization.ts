import { getRepository } from "typeorm";
import Post from "../../models/Posts";
import Projetos from "../../models/Projetos";

export async function getProjetoOfUsuarioForValidateWithAuthorization(
    id: string,
    Authorization: string | undefined,
) {
    try {
        const projetosRepository = getRepository(Projetos);
        const projeto = (
            await projetosRepository
                .findOneOrFail(
                    {
                        where: {
                            projeto_id: id,
                            usuario_Id: Authorization,
                        }
                    }
                ));
        return projeto;
    } catch (error) {
        return;
    };
};

export async function getPostOfUsuarioForValidateWithAuthorization(
    id: string,
    Authorization: string | undefined
) {
    try {
        const projetosRepository = getRepository(Post);
        const post = (
            await projetosRepository
                .findOneOrFail(
                    {
                        where: {
                            post_Id: id,
                            usuario_Id: Authorization
                        }
                    }
                ));
        return post;
    } catch (error) {
        return;
    };
};