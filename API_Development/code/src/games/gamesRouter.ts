import { Router } from "express";
import gamesController from "./gamesController";
import isAdmin from "../auth/isAdmin";

const router = Router();

router.get('/', isAdmin, gamesController.getAllGames);
router.get('/myGames', gamesController.getMyGames);
router.get('/:id', gamesController.getGameById);
router.post('/add', gamesController.createGame);
router.delete('/:id', isAdmin, gamesController.deleteGame);
router.delete('/myGames/:id', gamesController.removeGame);

export default router;
