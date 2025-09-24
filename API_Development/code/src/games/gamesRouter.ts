import { Router } from "express";
import gamesController from "./gamesController";

const router = Router();

router.get('/', gamesController.getAllGames);
router.get('/:id', gamesController.getGameById);

export default router;
