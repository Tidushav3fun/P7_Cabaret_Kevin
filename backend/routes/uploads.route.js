const express = require('express');
const router = express.Router();
const { authJwt } = require("../middleware");
const uploadController = require('../controllers/uploads.controller')
const multer = require('../middleware/multer-config')

// Créer un upload
router.post("/", [authJwt.verifyToken], multer.upload.single('image'), uploadController.create);

// Récupérer tous les uploads
router.get("/", [authJwt.verifyToken], uploadController.getAllUploads);

// Récupérer un seul upload avec son id
router.get("/:id", [authJwt.verifyToken],  uploadController.findOne);

// Récupérer les uploads par user
router.get("/user/:userId", [authJwt.verifyToken], uploadController.getPostsByProfile);

// Modifier un upload avec son id
router.put("/:id",[authJwt.verifyToken], multer.upload.single('image'), uploadController.update);

// Supprimer un upload avec son id
router.delete("/:id",[authJwt.verifyToken], uploadController.delete);

// Supprimer tous les uploads
router.delete("/",[authJwt.verifyToken], uploadController.deleteAll)

// Liker ou disliker un post
router.post('/like',[authJwt.verifyToken], uploadController.postLike)

// Avoir les likes sur un post
router.get('/:uploadId/likes',[authJwt.verifyToken], uploadController.getLikesByUpload)

module.exports = router