import { Request, Response, NextFunction } from 'express';
import coursesService from './coursesService';
import CustomError from '../general/CustomError';

const getAllCourses = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const courses = await coursesService.getAllCourses();

        if (!courses) {
            return res.status(200).json({
                success: true,
                message: 'No courses found!',
                courses
            })
        };

        return res.status(200).json({
            success: true,
            message: 'Courses loaded!',
            courses
        });
    } catch ( error ) {
        return next(error);
    }
};

const getCourseById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = Number(req.params.id);

        const course = await coursesService.getCourseById(id);

        if (!course) {
            throw new CustomError(`Course with id: ${id} not found!`, 404);
        };

        return res.status(200).json ({
            success: true,
            message: `Course with id: ${id} found!`,
            course,
        });
    } catch ( error ) {
        return next(error);
    }

};

const createCourse = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { name, location, holes, par } = req.body;

        if ( !name || !location ) {
            throw new CustomError(`Course name or location can not be empty`, 400);
        }
        if ( holes == null || par == null) {
            throw new CustomError(`Course must have hole number and course PAR`, 400);
        }

        const course = await coursesService.createCourse( name, location, holes, par )
        return res.status(201).json({
            success: true,
            id: course.insertId,
            message: `Course created!`,
            name,
            location,
            holes,
            par
        })} catch ( error ) {
            if ((error as any).code === 'ER_DUP_ENTRY') {
                return next(new CustomError("Course already exists!", 409));
            }

        return next(error);
    }
};

const deleteCourse = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = Number( req.params.id );

        const deleted = await coursesService.deleteCourse( id );

        if ( !deleted ) {
            throw new CustomError(`Course(${id}) not found!`, 404);
        }

        return res.status(204).send();
    } catch ( error ) {
        return next(error);
    }
};

const updateCourse = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = Number( req.params.id );
        const { course_name, course_location, holes, par } = req.body;

        if ( 
            course_name === undefined &&
            course_location === undefined &&
            holes === undefined &&
            par === undefined 
        ) {
            throw new CustomError(`Missing input: Course name, -Location, hole number or PAR`, 400);
        }

        const updates: any = {};
        if ( course_name !== undefined ) updates.course_name = course_name;
        if ( course_location !== undefined ) updates.course_location = course_location;
        if ( holes !== undefined ) updates.holes = holes;
        if ( par !== undefined ) updates.par = par

        const updated = await coursesService.updateCourse ( id, updates );

        if ( !updated ) {
            throw new CustomError(`Course(${id}) does not exist!`, 404);
        }

        return res.status(200).json({
            success: true,
            message: `Course updated!`,
            course: updated
        });
    } catch ( error ) {
        return next(error);
    }
};

export default { getAllCourses, getCourseById, createCourse, deleteCourse, updateCourse };
