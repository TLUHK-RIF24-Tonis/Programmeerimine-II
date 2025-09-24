import { Router } from "express";
import gamesController from "./gamesController";

const router = Router();

router.get('/', gamesController.getAllGames);
router.get('/:id', gamesController.getGameById);
router.post('/add', gamesController.createGame);

export default router;
