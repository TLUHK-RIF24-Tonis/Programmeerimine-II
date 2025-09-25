import { courses } from "../data";
import ICourses from "./coursesInterface";

const getCourseById = (id: number): ICourses | undefined => {
    const course = courses.find(course => course.id === id);
    return course
};

const getAllCourses = () : ICourses[] => {
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
