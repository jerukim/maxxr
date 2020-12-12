const express = require('express')
const app = express()
const routes = require('./routes')

const { errorHandler } = require('./middleware')

app.use(express.json())

app.get('/', (req, res) => {
    res.send('MAXXXXRRRR')
})

app.use('/auth', routes.auth)

app.use(errorHandler)

const port = process.env.PORT || 3000

app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`)
})