import { Router } from "express";
import coursesController from "./coursesController";
import isAdmin from "../auth/isAdmin";
import isLoggedIn from "../auth/isLoggedMiddleware";

const router = Router();

router.get('/', coursesController.getAllCourses);
router.get('/:id', coursesController.getCourseById);
router.post('/', isLoggedIn, isAdmin, coursesController.createCourse);
router.delete('/:id', isLoggedIn, isAdmin, coursesController.deleteCourse);
router.patch('/:id', isLoggedIn, isAdmin, coursesController.updatedCourse);

export default router;
