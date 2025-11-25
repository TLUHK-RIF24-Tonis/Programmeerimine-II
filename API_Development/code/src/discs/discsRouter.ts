import { Router } from "express";
import discsController from "./discsController";
import isAdmin from "../auth/isAdmin";

const router = Router();

router.get('/', discsController.getAllDiscs);
router.get('/:id', discsController.getDiscById);
router.get('/me', discsController.getMyDiscs);
router.post('/', isAdmin, discsController.createDisc);
router.get("/user/:id", isAdmin, discsController.getUserDiscs);
router.get("/user/disc/check", isAdmin, discsController.userHaveDisc);
router.delete('/:id', isAdmin, discsController.deleteDisc);
router.patch('/:id', isAdmin, discsController.updateDisc)

export default router;
