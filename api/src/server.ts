import express from 'express'
import * as routes from './routes'
import { errorHandler, isAuthenticated } from './middleware'

const app = express()

app.use(express.json())

// app.get('/*', (_, res) => {
//     res.sendFile('/public/index.html')
// })

app.use('/auth', routes.auth)

app.use(isAuthenticated)

app.use('/category', routes.category)

app.use(errorHandler)

const port = process.env.PORT || 8080

app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`)
})