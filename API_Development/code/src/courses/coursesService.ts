import { courses } from "../data";
import ICourses from "./coursesInterface";
import pool from "../database";
import { FieldPacket, ResultSetHeader } from "mysql2";

const getCourseById = async (id: number): Promise<ICourses | undefined> => {
    const [course]: [ICourses[], FieldPacket[]] = await pool.query(
        `SELECT id, course_name as name, course_location, holes, par FROM courses where id = ?;`, [id])
    return course[0];
};

const getAllCourses = async () : Promise<ICourses[]> => {
    const [courses]: [ICourses[], FieldPacket[]] = await pool.query(
        `SELECT id, course_name as name, course_location, holes, par, created_at as createdAt FROM courses;`)
    return courses;
};

const createCourse = async ( name: string, location: string, holes: number, par: number ) => {

    const sql = `
    INSERT INTO courses ( course_name, course_location, holes, par ) VALUES (?, ?, ?, ?);
    `

    const [addedCourse] = await pool.execute<ResultSetHeader>(sql, [name, location, holes, par]);
    return addedCourse;
};

const deleteCourse = async ( id: number ): Promise<boolean> => {
    const [deleted]: [ResultSetHeader, FieldPacket[]] = 
        await pool.query<ResultSetHeader>(`
            UPDATE courses
                SET deleted_at = CURRENT_TIMESTAMP,
                    updated_at = CURRENT_TIMESTAMP
            WHERE id = ? AND deleted_at IS NULL;
            `, [ id ]);

    return deleted.affectedRows > 0;
};

const updateCourse = async ( id: number, updates: Partial<Omit<ICourses, 'id'>> ): Promise<ICourses | undefined> => {
    
    if (
        updates.course_name === undefined &&
        updates.course_location === undefined &&
        updates.holes === undefined &&
        updates.par === undefined
    ) { 
        return getCourseById(id);
    }

    const params: ( string | number | null )[] = [
        updates.course_name ?? null,
        updates.course_location ?? null,
        updates.holes ?? null,
        updates.par ?? null,
        id
    ];

    const [result]: [ResultSetHeader, FieldPacket[]] =
        await pool.query<ResultSetHeader>(`
            UPDATE courses
                SET course_name = COALESCE(?, course_name),
                    course_location = COALESCE(?, course_location),
                    holes = COALESCE(?, holes),
                    par = COALESCE(?, par),
                    updated_at = CURRENT_TIMESTAMP
                WHERE id = ?
                    AND deleted_at IS NULL;
            `,  params);

    if ( result.affectedRows === 0 ) {
        return undefined;
    }

    return getCourseById(id);
}

export default { getCourseById, getAllCourses, createCourse, deleteCourse, updateCourse };
