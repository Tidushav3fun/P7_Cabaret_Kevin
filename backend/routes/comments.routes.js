const express = require('express');
const router = express.Router();
const commentsController = require('../controllers/comments.controller');
const { authJwt } = require('../middleware');

// Créer un post
router.post("/", [authJwt.verifyToken], commentsController.createComment);

// Avoir tous les commentaires
router.get("/", [authJwt.verifyToken], commentsController.getAllComments)

// Récupérer les commentaires sur un upload
router.get("/:uploadId",  [authJwt.verifyToken], commentsController.findComments);

// Récupérer un commentaire avec son id
router.get("/:uploadId/:id", [authJwt.verifyToken], commentsController.getCommentById)

// Supprimer un commentaire
router.delete('/:uploadId/:id', [authJwt.verifyToken], commentsController.deleteComment)

// Modifier un commentaire
router.put('/:uploadId/:id', [authJwt.verifyToken], commentsController.updateComment)

module.exports = router