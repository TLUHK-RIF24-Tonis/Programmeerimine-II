import { Router } from "express";
import discsController from "./discsController";

const router = Router();

router.get('/', discsController.getAllDiscs);
router.get('/:id', discsController.getDiscById);
router.post('/', discsController.createDisc);
router.get("/user/:id", discsController.getUserDiscs);
router.get("/user/disc/check", discsController.userHaveDisc);

export default router;
