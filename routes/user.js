import express from "express";

import userController from "../controllers/userController.js";
import middlewaresAuthor from "../middlewares/auth.js";

const router = express.Router();

router.get('/', userController.getAllUsers);
router.get('/me', userController.getMe);
router.delete('/:id', middlewaresAuthor.verifyAdmin, userController.delete);

export default router;
