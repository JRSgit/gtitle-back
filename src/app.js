import express, { urlencoded } from 'express'
import mongoose from 'mongoose'
import morgan from 'morgan'
import cors from 'cors'

import UserCtrl from './controllers/UserCtrl.js'


const app = express()

app.use(morgan('combined'))
app.use(express.json(urlencoded({ extended: true })))

mongoose.connect('mongodb+srv://jrsprog:198320jrs@cluster0.a2p4w.mongodb.net/gtitle')
  .then((result) => console.log('Sucesso'))
  .catch((err) => console.log(err.message))

app.use(cors({ origin: "*" }))

app.get('/', UserCtrl.store)
app.get('/user', UserCtrl.indexOne)

app.post('/session', UserCtrl.session)






export default app