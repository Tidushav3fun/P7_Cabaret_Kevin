const db = require('../models')
const User = db.user
const Uploads = db.uploads
const Comments = db.comments

const Op = db.sequelize.Op

exports.createComment = (req, res, next) => {
  const { commentBody, userId, uploadId } = req.body

  const comment = {
    commentBody: commentBody,
    userId: userId,
    uploadId: uploadId
  }

  Comments.create(comment)
    .then(data => {
      res.send(data)
    })
    .catch(err => {
      res.status(500).send({
        message: err || 'Impossible de poster votre commentaire'
      })
    })
}

exports.findComments = (req, res, next) => {
  const { uploadId } = req.params

  Comments.findAll({
    where: {
      uploadId: uploadId
    },
    include: [
      {
        model: User
      }
    ]
  })
    .then(data => {
      res.send(data)
    })
    .catch(err => {
      res.status(500).send({
        message:
          'Impossible de récupérer les commentaires sur cet upload: ' + uploadId
      })
    })
}

exports.getAllComments = (req, res, next) => {
  Comments.findAll({
    include: [
      {
        model: User
      }
    ]
  })
    .then(comments => {
      res.send(comments)
    })
    .catch(err => {
      res.status(500).send({
        error: err,
        message: 'Imopssible de récupérer tous les commentaires'
      })
    })
}

// Avoir le commentaire avec son ID

exports.getCommentById = (req, res, next) => {
  const { id, uploadId } = req.params

  Comments.findAll({
    where: {
      uploadId: uploadId
    },
    include: [
      {
        model: User
      }
    ]
  })
    .then(() => {
      Comments.findOne({
        where: {
          id: id
        },
        include: [
          {
            model: User
          }
        ]
      })
        .then(comment => {
          res.send(comment)
        })
        .catch(err => {
          res.send(err)
        })
    })
    .catch(err => {
      res.status(500).send({
        error: err,
        message: 'Impossible de récupérer ce commentaire'
      })
    })
}

// Supprimer le commentaire avec son ID

exports.deleteComment = (req, res, next) => {
  const { id, uploadId } = req.params

  Comments.findAll({
    where: {
      uploadId: uploadId
    },
    include: [
      {
        model: User
      }
    ]
  })
    .then(() => {
      Comments.destroy({
        where: {
          id: id
        },
        include: [
          {
            model: User
          }
        ]
      })
        .then(num => {
          if (num == 1) {
            res.status(200).json({
              message: 'Commentaire supprimé avec succès'
            })
          } else {
            res.send({
              message:
                'Imposible de supprimer ce commentaire, peut-être a-t-il déjà été supprimé'
            })
          }
        })
        .catch(err => {
          res.send(err)
        })
    })
    .catch(err => {
      res.status(500).send({
        error: err,
        message: 'Impossible de supprimer ce commentaire'
      })
    })
}

// Modifier le commentaire

exports.updateComment = (req, res, next) => {
  const { uploadId, id } = req.params

  Comments.findOne({
    where: {
      id: id,
      uploadId: uploadId
    },
    include: [
      {
        model: User
      }
    ]
  }).then(() => {
    Comments.update(req.body, {
      where: {
        uploadId: uploadId,
        id: id
      }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: 'Commentaire modifié avec succès',
            num: num
          })
        } else {
          res.send({
            message: 'Impossible de modifier ce commmentaire'
          })
        }
      })
      .catch(err => {
        res.status(500).json({
          message: 'Impossible de modifier ce commentaire',
          err: err
        })
      })
  })
}
