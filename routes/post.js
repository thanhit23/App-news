import express from "express";
import postsController from "../controllers/postController.js";
const router = express.Router();

router.post('/', postsController.create);
router.get('/', postsController.getList);
router.get('/:id', postsController.detail);
router.delete('/:id', postsController.delete);
router.put('/:id', postsController.update);

export default router;
