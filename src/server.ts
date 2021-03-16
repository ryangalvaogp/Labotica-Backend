import express from 'express'
import Routes from './routes'
import cors from 'cors'

import './database/connection'

const app = express()
app.use(express.json())
app.use(cors())




//Rotas Dinâmicas
app.use(Routes)



app.listen(3333)