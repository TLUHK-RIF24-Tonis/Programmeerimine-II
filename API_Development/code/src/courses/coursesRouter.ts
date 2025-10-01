import { Router } from "express";
import coursesController from "./coursesController";

const router = Router();

router.get('/', coursesController.getAllCourses);
router.get('/:id', coursesController.getCourseById);
router.post('/', coursesController.createCourse)

export default router;
