import { Router } from "express";
import coursesController from "./coursesController";
import isAdmin from "../auth/isAdmin";

const router = Router();

router.get('/', coursesController.getAllCourses);
router.get('/:id', coursesController.getCourseById);
router.post('/', isAdmin, coursesController.createCourse);
router.delete('/:id', isAdmin, coursesController.deleteCourse);

export default router;
