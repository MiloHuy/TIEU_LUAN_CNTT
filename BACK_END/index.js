const express = require('express')
const cookieParser = require('cookie-parser');
const morgan = require('morgan')
const dotenv = require('dotenv');
const app = express()
const port = 3000

const route = require('./routes');
const connectDatabase = require('./config/database')

dotenv.config();

app.use(express.json());
app.use(cookieParser());

connectDatabase()

app.use(morgan('combined'))

app.get('/', (req, res) => {
  res.send('Hello World!')
})

// Route init
route(app);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})