const express = require('express')
const mongo = require('mongodb')
const colors = require('colors')
const morgan = require('morgan')
const dotenv = require('dotenv')
const connectDb = require('./config/db')
const app = express()


app.use(morgan('dev'))
dotenv.config({
    path: './config/config.env'
})

https://todoapp70.herokuapp.com/api/todo/register

app.use(express.json({}))
app.use(express.json({
    extended: true
}))


connectDb()




app.use('/api/kisanContact/auth', require('./routes/user'))
app.use('/api/kisanContact/tasks',require('./routes/todo'))



const PORT = process.env.PORT || 5500

app.listen(PORT,console.log(`Listening at ${PORT}..`.red.underline.bold))