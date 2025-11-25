import { Router } from "express";
import usersController from "./usersController";
import isAdmin from "../auth/isAdmin";
import isLoggedIn from "../auth/isLoggedMiddleware";

const router = Router();

router.get('/me', usersController.getCurrentUser);
router.patch('/me', usersController.updateSelf);
router.patch('/:id', isAdmin, usersController.updateUser);
router.get('/', isAdmin, usersController.getAllUsers);
router.get('/:id', isAdmin, usersController.getUserById);
router.patch('/:id/status', isAdmin, usersController.userStatus);
router.delete('/:id', isAdmin, usersController.deleteUser);

export default router;
