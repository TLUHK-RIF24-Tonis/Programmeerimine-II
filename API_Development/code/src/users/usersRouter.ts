import { Router } from "express";
import usersController from "./usersController";
import isAdmin from "../auth/isAdmin";

const router = Router();

router.get('/', isAdmin, usersController.getAllUsers);
router.get('/:id', isAdmin, usersController.getUserById);
router.post('/:id/status', usersController.userStatus);

export default router;
