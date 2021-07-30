const express = require('express');
const router = express.Router();
const { authJwt } = require("../middleware");
const userController = require("../controllers/user.controller");
const multer = require('../middleware/multer-config')


//GET

router.get("/", [authJwt.verifyToken], userController.allAccess);
router.get("/uploads", [authJwt.verifyToken], userController.uploadsBoard);
router.get("/mod", [authJwt.verifyToken, authJwt.isModerator], userController.moderatorBoard)
router.get("/admin", [authJwt.verifyToken, authJwt.isAdmin], userController.adminBoard)
router.get('/users', [authJwt.verifyToken], userController.getAllUsers)
router.get("/users/:id", [authJwt.verifyToken], userController.getUser)


//DELETE 

router.delete("/users/:id",[authJwt.verifyToken], userController.deleteUser)
router.delete("/users",[authJwt.verifyToken], userController.deleteAll)

//UPDATE

router.put("/users/:id",[authJwt.verifyToken], multer.upload.single('image'), userController.updateUser)

module.exports = router