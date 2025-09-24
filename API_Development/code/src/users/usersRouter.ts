import { Router } from "express";
import usersController from "./usersController";

const router = Router();

router.get('/:id', usersController.getUserById);
router.post('/:id/status', usersController.userStatus);

export default router;