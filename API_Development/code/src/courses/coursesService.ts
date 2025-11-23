import { courses } from "../data";
import ICourses from "./coursesInterface";
import pool from "../database";
import { FieldPacket, ResultSetHeader } from "mysql2";

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

const createCourse = async ( name: string, location: string, holes: number, par: number ) => {

    const sql = `
    INSERT INTO courses ( course_name, location, holes, par ) VALUES (?, ?, ?, ?);
    `

    const [addedCourse] = await pool.execute<ResultSetHeader>(sql, [name, location, holes, par]);
    return addedCourse;
};

export default { getCourseById, getAllCourses, createCourse };
