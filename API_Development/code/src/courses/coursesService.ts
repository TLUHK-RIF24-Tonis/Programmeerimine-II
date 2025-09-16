import data from "../data";
import ICourses from "./coursesInterface";

const getCourseById = (id: number): ICourses | undefined => {
    const course = data.courses.find(course => course.id === id);
    return course
};

const getAllCourses = () : ICourses[] => {
    return data.courses;
};

export default { getCourseById, getAllCourses };
