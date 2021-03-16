import express from 'express'
import multer from 'multer'
import path from 'path'
import uploadsConfig from './config/uploads/uploads'
import uploadsForPostConfig from './config/uploads/uploadForPost'

import imagesProjetosControllers from './controllers/imagesProjetosControllers'
import postsControllers from './controllers/postsControllers'
import projetosControllers from './controllers/projetosControllers'
import usuariosControllers from './controllers/usuariosControllers'
import sessionControllers from './controllers/sessionControllers'
import projetoViewsControllers from './controllers/views/projetoViewsControllers'


const Route = express.Router()

const uploads = multer(uploadsConfig)
const uploadForPost = multer(uploadsForPostConfig)


Route.post('/session/login', sessionControllers.Login)


Route.get('/usuarios', usuariosControllers.index)
Route.post('/usuarios', usuariosControllers.create)
Route.delete('/usuarios/:id', usuariosControllers.delete)


Route.get('/projetos', projetosControllers.index)
Route.post('/projetos', uploads.array('images'), projetosControllers.create)
Route.delete('/projetos/:id', projetosControllers.delete)



Route.post('/projetos/images', imagesProjetosControllers.index )
Route.post('/projetos/images/:id', imagesProjetosControllers.showImages )

Route.get('/post', postsControllers.index)
Route.post('/post', uploadForPost.single('image') , postsControllers.create)



//Views
Route.post('/views/user/projeto/:id', projetoViewsControllers.allProjetosOfUser)
Route.post('/views/user/projeto/images/:id', projetoViewsControllers.imagesOfProjetoOfUser)




//Rotas Estáticas
Route.use('/files/posts',
    express.static(
        path.resolve(
            __dirname,
            '..',
            'uploads',
            'posts',
            'resized'
        )
    )
)
Route.use('/files/projetos',
    express.static(
        path.resolve(
            __dirname,
            '..',
            'uploads'
        )
    )
)




export default Route;