import { Request, Response } from 'express';
import coursesService from './coursesService';

const getAllCourses = (req: Request, res: Response) => {

const courses = coursesService.getAllCourses();

return res.status(200).json({
    success: true,
    message: 'Courses loaded!',
    courses
});
};

const getCourseById = (req: Request, res: Response) => {
    
    const id = Number(req.params.id);

    const course = coursesService.getCourseById(id);

    if (!course) {
        return res.status(404).json ({
            success: false,
            message: `Course with this id: ${id} does not exist!`
        });
    };

    return res.status(200).json ({
        success: true,
        message: `Course with id: ${id} found!`,
        course,
    });
};

export default { getAllCourses, getCourseById };
