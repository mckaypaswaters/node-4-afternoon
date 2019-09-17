require('dotenv').config()
const express = require('express')
const session = require('express-session')
const app = express()
const middleware = require('./middlewares/checkForSession')
const {SERVER_PORT, SESSION_SECRET} = process.env
const swagCtrl = require('./controllers/swagController')
const authCtrl = require('./controllers/authController')

app.use(express.json())
app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: SESSION_SECRET
}))
app.use(middleware.checkSession)

app.get('/api/swag', swagCtrl.read)
app.post('/api/register', authCtrl.register)
app.post('/api/login', authCtrl.login)
app.post('/api/signout', authCtrl.signout)
app.get('/api/user', authCtrl.getUser)


app.listen(SERVER_PORT, () => console.log(`${SERVER_PORT} problems but code ain't one`))