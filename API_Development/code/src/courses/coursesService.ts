import { courses } from "../data";
import ICourses from "./coursesInterface";
import pool from "../database";
import { FieldPacket } from "mysql2";

const getCourseById = async (id: number): Promise<ICourses | undefined> => {
    const [course]: [ICourses[], FieldPacket[]] = await pool.query(
        `SELECT id, course_name as name, location, holes, par FROM courses where id = ?;`, [id])
    return course[0];
};

const getAllCourses = async () : Promise<ICourses[]> => {
    const [courses]: [ICourses[], FieldPacket[]] = await pool.query(
        `SELECT id, course_name as name, location, holes, par, created_at as createdAt FROM courses;`)
    return courses;
};

const createCourse = ( name: string, location: string, holes: number, par: number ) => {
    const id = courses[courses.length - 1].id + 1;

    const allCourses = getAllCourses();
    const exist = allCourses.some(c => c.name === name && c.location === location);

    if ( exist ) return null;

    const course: ICourses = {
        id,
        name,
        location,
        holes,
        par
    };
    courses.push(course);
    return course
};

export default { getCourseById, getAllCourses, createCourse };
