const db = require('../models')
const Upload = db.uploads
const User = db.user
const Like = db.likes
const fs = require('fs')

const Op = db.Sequelize.Op

//Créer l'upload

exports.create = (req, res, next) => {
  const { title, description, userId } = req.body

  const image = `${req.protocol}://${req.get('host')}/images/${
    req.file.filename
  }`

  if (!title) {
    res.status(400).send({
      message: 'Le titre ne peut pas être vide.'
    })
    return
  }

  if (!description) {
    res.status(400).send({
      message: 'La description ne peut pas être vide'
    })
    return
  }

  if (req.body.image) {
    res.status(200).send({
      message: 'Image bien envoyée !'
    })
    return
  }

  const upload = {
    title: title,
    description: description,
    image: image,
    userId: userId
  }

  // Sauver l'upload dans la Base de données

  Upload.create(upload)
    .then(upload => {
      Upload.findOne({
        where: {
          id: upload.id
        },
        include: [
          {
            model: User
          }
        ]
      })
        .then(newUpload => {
          res.status(200).send({
            message: 'Post bien crée',
            upload: newUpload
          })
        })
        .catch(err => res.send({ message: err }))
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || 'Impossible de créer votre post.'
      })
    })
}

// Récupérer tous les uploads de la Base de données

exports.getAllUploads = (req, res, next) => {
  const title = req.query.title
  let condition = title ? { title: { [Op.like]: `%${title}%` } } : null

  Upload.findAll({
    where: condition,
    order: [['id', 'DESC']],
    include: [
      {
        model: User,
        attributes: { exclude: ['password'] }
      },
      {
        model: Like,
        as: '_likes'
      }
    ]
  })
    .then(uploads => {
      res.send(uploads)
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || 'Impossible de récupérer les posts.'
      })
    })
}

exports.findOne = (req, res, next) => {
  const { id } = req.params
  const userId = req.userId

  Upload.findOne({
    where: {
      id: id
    },

    include: [
      {
        model: User,
        as: 'user'
      },
      {
        model: Like,
        as: '_likes'
      }
    ]
  })
    .then(data => {
      Like.findOne({
        where: {
          uploadId: id,
          userId: userId
        }
      })
        .then(like => {
          data.likes = like
          res.send(data)
        })
        .catch(err => res.send(err))
    })
    .catch(err => {
      res.status(500).send({
        err: err.message,
        message: 'Impossible de récupérer ce post avec cet id: ' + id
      })
    })
}

// Récupérer les uploads par profil

exports.getPostsByProfile = (req, res, next) => {
  const userId = req.params.userId

  Upload.findAll({ where: { userId } })
    .then(data => {
      res.send(data)
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || 'Impossible de récupérer les posts'
      })
    })
}

// Modifier un upload avec son ID
exports.update = (req, res, next) => {
  const { id } = req.params

  if (req.file) {
    req.body.image = `${req.protocol}://${req.get('host')}/images/${
      req.file.filename
    }`
  }

  // const filename = req.body.image.split('/images/')[1]

  Upload.findOne({ where: { id: id } }).then(() => {
    Upload.update(req.body, {
      where: { id: id }
    })
      .then(data => {
        res.send(data)
      })
      .catch(err => {
        res.status(500).send({
          message: 'Impossible de modifier le post avec cet id : ' + id,
          error: err
        })
      })
  })
}

//Supprimer un upload avec son id

exports.delete = (req, res, next) => {
  const { id } = req.params

  Upload.findOne({ where: { id: id } }).then(upload => {
    const filename = upload.image.split('/images/')[1]

    fs.unlink(`images/${filename}`, () => {
      Upload.destroy({
        where: {
          id: id
        }
      })
        .then(num => {
          if (num == 1) {
            res.send({
              message: 'Ce post a été supprimé avec succès'
            })
          } else {
            res.send({
              message: `Impossible de supprimer ce post avec l'id ${id}`
            })
          }
        })
        .catch(err => {
          res.status(500).send({
            message: "Impossible de supprimer ce post avec l'id :" + id || err
          })
        })
    })
  })
}

exports.deleteAll = (req, res, next) => {
  Upload.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} posts ont été supprimés` })
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || 'Impossible de supprimer tous les posts'
      })
    })
}

// Liker un post

exports.postLike = async (req, res, next) => {
  const { uploadId, userId } = req.body

  const likeFound = await Like.findOne({
    where: {
      userId: userId,
      uploadId: uploadId
    }
  })

  if (!likeFound) {
    await Like.create({
      uploadId: uploadId,
      userId: userId
    })
      .then(() => {
        Upload.increment('likes', {
          where: {
            id: uploadId
          }
        })
        res.json('Vous avez liké ce post')
      })
      .catch(err => res.send(err))
  } else {
    await Like.destroy({
      where: {
        uploadId: uploadId,
        userId: userId
      }
    })
      .then(() => {
        Upload.decrement('likes', {
          where: {
            id: uploadId
          }
        })
        res.json('Vous avez retiré votre like')
      })
      .catch(err => res.send(err))
  }
}

exports.getLikesByUpload = (req, res, next) => {
  const { uploadId } = req.params

  Like.findAll({ where: { uploadId: uploadId } })
    .then(data => {
      res.send(data)
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || 'Impossible de récupérer les likes sur ce post'
      })
    })
}
