const express = require('express')
const bodyParser = require('body-parser')


const app = express()
const port = 3008

app.use(bodyParser.json())

app.use('/', (req, res) => {
    res.send('hello-world')
})



app.listen(port, () => console.log(`listening on port ${port}`))