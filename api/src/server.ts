import express from 'express'
import * as routes from './routes'
import { errorHandler } from './middleware'

const app = express()

app.use(express.json())

app.get('/', (_, res) => {
    res.send('MAXXXXRRRR')
})

app.use('/auth', routes.auth)

app.use(errorHandler)

const port = process.env.PORT || 8080

app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`)
})