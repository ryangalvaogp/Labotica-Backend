import express from 'express';
import multer from 'multer';
import path from 'path';
import uploadsConfig from './config/uploads/uploads';
import uploadsForPostConfig from './config/uploads/uploadForPost';

import imagesProjetosControllers from './controllers/imagesProjetosControllers';
import postsControllers from './controllers/postsControllers';
import projetosControllers from './controllers/projetosControllers';
import usuariosControllers from './controllers/usuariosControllers';
import sessionControllers from './controllers/sessionControllers';

import projetoViewsControllers from './controllers/views/projetoViewsControllers';
import usuarioViewsControllers from './controllers/views/usuarioViewsControllers';
import postViewsControllers from './controllers/views/postViewsControllers';
import carrouselControllers from './controllers/views/carrouselControllers';

const Route = express.Router();

const uploads = multer(uploadsConfig);
const uploadForPost = multer(uploadsForPostConfig);


Route.get('/', async (req, res)=>{
return res.json("Funcionando perfeitamente")
})

Route.post('/session/login', sessionControllers.Login);

Route.get('/usuarios', usuariosControllers.index);
Route.post('/usuarios', usuariosControllers.create);
Route.put('/usuarios/:id', usuariosControllers.update);
Route.put('/usuarios/password/:id', usuariosControllers.updatePassword);
Route.delete('/usuarios/:id', usuariosControllers.delete);

Route.get('/projetos', projetosControllers.index);
Route.post('/projetos', uploads.array('images'), projetosControllers.create);
Route.post('/projetos/:id', projetosControllers.show);
Route.delete('/projetos/:id', projetosControllers.delete);
Route.put('/projetos/carrousel/:id', projetosControllers.toCarrousel);

Route.get('/projetos/images', imagesProjetosControllers.index );
Route.post('/projetos/images/:id', imagesProjetosControllers.showImages );
Route.put('/projetos/images/default/:id', imagesProjetosControllers.setImageDefault );

Route.get('/post', postsControllers.index);
Route.post('/post', uploadForPost.single('image') , postsControllers.create);
Route.delete('/post/:id', postsControllers.delete);

//Views
Route.post('/views/user/projeto/:id', projetoViewsControllers.allProjetosOfUser);
Route.get('/views/projeto/carrousel', carrouselControllers.index);
Route.post('/views/projeto/images/:id', projetoViewsControllers.imagesOfProjetoOfUser);
Route.get('/views/projeto/imagedefault', projetoViewsControllers.listProjetos);
Route.get('/views/user/allalunos',usuarioViewsControllers.listAllAlunos);
Route.get('/views/user/allprofessores',usuarioViewsControllers.listAllProfessores);
Route.post('/views/user/posts/:id', postsControllers.postUser);
Route.get('/views/post/allposts/Alunos', postViewsControllers.listAllPostsAlunos);
Route.get('/views/post/allposts/Professores', postViewsControllers.listAllPostsProfessores);

//Rotas Estáticas
Route.use('/files/posts',
    express.static(
        path.resolve(
            __dirname,
            '..',
            'uploads',
            'posts',    
            'resized'
            
        ),
    ),
);

Route.use('/files/projetos',
    express.static(
        path.resolve(
            __dirname,
            '..',
            'uploads'
        ),
    ),
);

export default Route;