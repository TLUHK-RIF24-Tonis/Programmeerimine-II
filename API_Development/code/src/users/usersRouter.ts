import { Router } from "express";
import usersController from "./usersController";
import isAdmin from "../auth/isAdmin";

const router = Router();

router.get('/', isAdmin, usersController.getAllUsers);
router.get('/:id', isAdmin, usersController.getUserById);
router.get('/me', usersController.getCurrentUser);
router.patch('/:id/status', isAdmin, usersController.userStatus);
router.delete('/:id', isAdmin, usersController.deleteUser);

export default router;
