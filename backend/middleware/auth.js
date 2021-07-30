const jwt = require('jsonwebtoken')
require('dotenv').config()
const db = require('../models')
const User = db.user

verifyToken = (req, res, next) => {
  let token = req.headers.authorization

  if (!token) {
    return res.status(403).send({
      message: 'Connectez-vous pour accéder à ce contenu.'
    })
  }

  jwt.verify(
    token.split(' ')[1],
    'process.env.TOKEN_SECRET',
    (err, decoded) => {
      if (err) {
        return res.status(401).send({
          message: 'Non autorisé'
        })
      }

      req.userId = decoded.id
      next()
    }
  )
}

isAdmin = (req, res, next) => {
  User.findByPk(req.userId).then(user => {
    user.getRoles().then(roles => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === 'admin') {
          next()
          return
        }
      }
      res.status(403).send({
        message: 'Rôle admin requis'
      })
      return
    })
  })
}

isModerator = (req, res, next) => {
  User.findByPk(req.userId).then(user => {
    user.getRoles().then(roles => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === 'moderator') {
          next()
          return
        }
      }

      res.status(403).send({
        message: 'Rôle modérateur requis'
      })
      return
    })
  })
}

isModeratorOrAdmin = (req, res, next) => {
  User.findByPk(req.userId).then(user => {
    user.getRoles().then(roles => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === 'moderator') {
          next()
          return
        }

        if (roles[i].name === 'admin') {
          next()
          return
        }
      }

      res.status(403).send({
        message: 'Rôle admin ou modérateur requis'
      })
    })
  })
}

const authJwt = {
  verifyToken: verifyToken,
  isAdmin: isAdmin,
  isModerator: isModerator,
  isModeratorOrAdmin: isModeratorOrAdmin
}

module.exports = authJwt
