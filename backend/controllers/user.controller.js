const db = require('../models')
const User = db.user
const Uploads = db.uploads
const Comments = db.comments
const Likes = db.likes
const Op = db.Sequelize.Op

exports.allAccess = (req, res) => {
  res.status(200).send('Public Content')
}

exports.uploadsBoard = (req, res) => {
  res.status(200).send('+ Upload')
}

exports.adminBoard = (req, res) => {
  res.status(200).send('Admin Content.')
}

exports.moderatorBoard = (req, res) => {
  res.status(200).send('Moderator Content.')
}

// Chercher tous les utilisateurs 

exports.getAllUsers = (req, res, next) => {
  const { firstName } = req.query
  let condition = firstName
    ? { firstName: { [Op.like]: `%${firstName}%` } }
    : null

  User.findAll({
    where: condition,
    include: [
      {
        model: Uploads,
        include: [
          {
            model: Comments
          }
        ]
      }
    ]
  })
    .then(users => {
      const resObj = users.map(user => {
        return Object.assign(
          {},
          {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            description: user.description,
            image: user.image,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
            uploads: user.uploads.map(upload => {
              return Object.assign(
                {},
                {
                  uploadId: upload.id,
                  userId: upload.userId,
                  title: upload.title,
                  likes: upload.likes,
                  description: upload.description,
                  image: upload.image,
                  createdAt: upload.createdAt,
                  updatedAt: upload.updatedAt,
                  comments: upload.comments.map(comment => {
                    return Object.assign(
                      {},
                      {
                        commentId: comment.id,
                        uploadId: comment.uploadId,
                        commentBody: comment.commentBody
                      }
                    )
                  })
                }
              )
            })
          }
        )
      })
      res.json(resObj)
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || 'Impossible de récupérer les utilisateurs'
      })
    })
}

// Supprimer un utilisateur

exports.deleteUser = (req, res, next) => {
  const { id } = req.params

  User.destroy({
    where: { id: id }
  })
    .then(res => {
      res.send({
        message: 'Utilisateur supprimé'
      })
    })
    .catch(err =>
      res
        .send({ message: 'Impossible de supprimer cet utilisateur ', err: err.message })
    )
}

// Chercher un utilisateur

exports.getUser = (req, res, next) => {
  const { id } = req.params

  User.findOne({
    where: {
      id: id
    },
    include: [
      {
        model: Comments
      },
      {
        model: Likes
      }
    ]
  })
    .then(data => {
      res.send(data)
    })
    .catch(err =>
      res.status(500).send({
        message: "Impossible de récupérer cet utilisateur avec l'id : " + id
      })
    )
}

// Mettre à jour un utilisateur 

exports.updateUser = (req, res, next) => {
  const { id } = req.params

  if (req.file) {
    req.body.image = `${req.protocol}://${req.get('host')}/images/${
      req.file.filename
    }`
  }
  User.findOne({ where: { id: id } })
    .then(() => {
      User.update(req.body, {
        where: { id: id }
      })
        .then(num => {
          if (num == 1) {
            // à enlever et voir
            res.status(200).send({ message: 'Utilisateur modifié avec succès' })
          } else {
            res.send({
              message: `Impossible de mofifier cet utilisateur n°${id}. Peut-être que cet utilisateur n'a pas été trouvé dans la BDD.`
            })
          }
        })
        .catch(err =>
          res
            .status(500)
            .send({ message: err || 'Impossible de modifier cet utilisateur' })
        )
    })
    .catch(err => res.send(err))
}


//Supprimer les utilisateurs 

exports.deleteAll = (req, res, next) => {
  User.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} utilisateurs ont été supprimés` })
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || 'Impossible de supprimer tous les utilisateurs'
      })
    })
}
