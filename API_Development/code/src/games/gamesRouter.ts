import { Router } from "express";
import gamesController from "./gamesController";
import isAdmin from "../auth/isAdmin";

const router = Router();

router.get('/', isAdmin, gamesController.getAllGames);
router.get('/myGames', gamesController.getMyGames);
router.get('/admin/:id', isAdmin, gamesController.getGameById);
router.get('/:id', gamesController.getUserGameById);
router.post('/add', gamesController.createGame);
router.delete('/:id', isAdmin, gamesController.deleteGame);
router.patch('/myGames/:id/leave', gamesController.removeFromGame);
router.patch('/:id', gamesController.updateGame);

export default router;
