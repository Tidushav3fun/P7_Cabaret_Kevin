const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const path = require('path')
const app = express()
const helmet = require('helmet')
const nocache = require('nocache')

app.use(
  cors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204,
    credentials: true,
    allowedHeaders: '*'
  })
)

//All environments
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use('/images', express.static(path.join(__dirname, 'images'))) //__dirname qui est le nom du dossier dans lequel on est

const db = require('./models')
const Role = db.role

db.sequelize.sync()

//!!!!!!!!A ACTIVER SI ON VEUT REMETTRE LA BASE DE DONNEES A 0 !!!!!!!!!!!!!!!
//db.sequelize.sync({force: true}).then(() => {
//console.log('Drop and Resync Database with { force: true }');
//initial();
//});

app.get('/', (req, res) => {
  res.json({ message: 'Bienvenue sur le réseau social de Groupomania' })
})

//ROUTES
const userRoute = require('./routes/user.routes')
app.use('/api/userService', userRoute)
const authRoute = require('./routes/auth.routes')
app.use('/api/auth', authRoute)
const uploadsRoute = require('./routes/uploads.route')
app.use('/api/uploads', uploadsRoute)
const commentsRoute = require('./routes/comments.routes')
app.use('/api/comments', commentsRoute)

app.listen(5000, (req, res) => {
  console.log('Serveur connecté au port 5000 !')
})

function initial () {
  Role.create({
    id: 1,
    name: 'user'
  })

  Role.create({
    id: 2,
    name: 'moderator'
  })

  Role.create({
    id: 3,
    name: 'admin'
  })
}

app.use(nocache())
app.use(helmet())
