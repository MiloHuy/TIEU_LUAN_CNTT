const express = require('express')
const morgan = require('morgan')
const app = express()
const port = 3000

const connectDatabase = require('./config/database')

//connectDatabase()

app.use(morgan('combined'))

app.get('/', (req, res) => {
  res.send('Hello World!')
})

// Import all routes
const auth = require('./routes/auth');
const post = require('./routes/post');
const me = require('./routes/me');

app.use('/', me)
app.use('/', auth)
app.use('/', post)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})