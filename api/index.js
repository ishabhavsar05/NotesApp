const express = require('express')
const app = express()
var cors = require('cors')
require('dotenv').config()
const cookieParser = require('cookie-parser');


const port = process.env.PORT || 3000
app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}))

app.use(express.json())
const connectDB = require('./utils/db');
const connectToDb = require('./utils/db');


app.use('/user', require('./routes/user.route.js'))
app.use('/note', require('./routes/note.route.js'))


app.listen(port, () => {
  connectToDb();
  console.log(`Example app listening on port ${port}`)
})
