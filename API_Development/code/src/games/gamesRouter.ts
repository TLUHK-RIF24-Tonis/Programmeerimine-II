import { Router } from "express";
import gamesController from "./gamesController";
import isAdmin from "../auth/isAdmin";

const router = Router();

router.get('/myGames', gamesController.getMyGames);
router.get('/:id', gamesController.getUserGameById);
router.post('/add', gamesController.createGame);
router.patch('/myGames/:id/leave', gamesController.removeFromGame);
router.patch('/:id', gamesController.updateGame);
router.delete('/:id', isAdmin, gamesController.deleteGame);
router.get('/admin/:id', isAdmin, gamesController.getGameById);
router.get('/', isAdmin, gamesController.getAllGames);

export default router;
