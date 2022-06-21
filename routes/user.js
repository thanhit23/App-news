import express from "express";

import userController from "../controllers/userController.js";
import middlewaresAuthor from "../middlewares/auth.js";

const router = express.Router();

router.get('/', middlewaresAuthor.verifyToken, userController.getAllUsers);
router.get('/me', middlewaresAuthor.verifyToken, userController.getMe);
router.delete('/:id', middlewaresAuthor.verifyToken, middlewaresAuthor.verifyAdmin, userController.deleteUser);

export default router;
