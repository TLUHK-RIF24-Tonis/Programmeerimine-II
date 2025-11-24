import { Router } from "express";
import discsController from "./discsController";
import isAdmin from "../auth/isAdmin";

const router = Router();

router.get('/', discsController.getAllDiscs);
router.get('/:id', discsController.getDiscById);
router.post('/', isAdmin, discsController.createDisc);
router.get("/user/:id", isAdmin, discsController.getUserDiscs);
router.get("/user/disc/check", discsController.userHaveDisc);
router.delete( '/:id', isAdmin, discsController.deleteDisc)

export default router;
