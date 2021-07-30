const db = require('../models')
const ROLES = db.ROLES
const User = db.user

checkDuplicateEmail = (req, res, next) => {
  // Email
  User.findOne({
    where: {
      email: req.body.email
    }
  }).then(user => {
    if (user) {
      res.status(400).send({
        message: 'Email déjà utilisé'
      })
      return
    }

    next()
  })
}

checkRolesExisted = (req, res, next) => {
  if (req.body.roles) {
    for (let i = 0; i < req.body.roles.length; i++) {
      if (!ROLES.includes(req.body.roles[i])) {
        res.status(400).send({
          message: "Ce rôle n'existe pas = " + req.body.roles[i]
        })
        return
      }
    }
  }

  next()
}

const verifySignUp = {
  checkDuplicateEmail: checkDuplicateEmail,
  checkRolesExisted: checkRolesExisted
}

module.exports = verifySignUp