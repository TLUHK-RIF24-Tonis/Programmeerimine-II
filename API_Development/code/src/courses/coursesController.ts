import { Request, Response } from 'express';
import coursesService from './coursesService';

const getAllCourses = async (req: Request, res: Response) => {

const courses = await coursesService.getAllCourses();

if (!courses) {
    return res.status(200).json({
        success: true,
        message: 'No courses found!',
        courses: []
    })
};

return res.status(200).json({
    success: true,
    message: 'Courses loaded!',
    courses
});
};

const getCourseById = async (req: Request, res: Response) => {
    
    const id = Number(req.params.id);

    const course = await coursesService.getCourseById(id);

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

const createCourse = async ( req: Request, res: Response ) => {
    const { name, location, holes, par } = req.body;

    if ( !name || !location ) {
        return res.status(400).json ({
            success: false,
            message: 'Course name or location can not be empty'
        })
    }
    if ( holes == null || par == null) {
        return res.status(400).json ({
            success: false,
            message: 'Course must have hole number and course PAR'
        })
    }

    try {
    const course = await coursesService.createCourse( name, location, holes, par )
    return res.status(201).json({
        success: true,
        id: course.insertId,
        message: `Course created!`,
        name,
        location,
        holes,
        par
    })} catch ( err: any ) {
        if ( err.code === "ER_DUP_ENTRY") {
            return res.status(409).json({
                success: false,
                message: 'Course already exists!'
            });
        }
        return res.status(500).json({
            success: false,
            message: "Internal server error"
    })
    }
};

const deleteCourse = async ( req: Request, res: Response ) => {
    const id = Number( req.params.id );

    const deleted = await coursesService.deleteCourse( id );

    if ( !deleted ) {
        return res.status(404).json({
            success: false,
            message: `Course(${id}) not found!`
        });
    }

    return res.status(204).send();
};

const updatedCourse = async ( req: Request, res: Response ) => {
    const id = Number( req.params.id );
    const { course_name, course_location, holes, par } = req.body;

    if ( 
        course_name === undefined &&
        course_location === undefined &&
        holes === undefined &&
        par === undefined 
    ) {
        return res.status(400).json({
            success: false,
            message: `Missing input: Course name, -Location, hole number or PAR`
        });
    }

    const updated = await coursesService.updateCourse ( id, { course_name, course_location, holes, par } );

    if ( !updated ) {
        return res.status(404).json({
            success: false,
            message: `Course(${id}) does not exist!`
        });
    }

    return res.status(200).json({
        success: true,
        message: `Course updated!`,
        Course: updated
    })
}

export default { getAllCourses, getCourseById, createCourse, deleteCourse, updatedCourse };
