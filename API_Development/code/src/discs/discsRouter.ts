import { Router } from "express";
import discsController from "./discsController";

const router = Router();

router.get('/', discsController.getAllDiscs);
router.get('/:id', discsController.getDiscById);

export default router;
