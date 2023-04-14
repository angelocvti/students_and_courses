import { StudentCourseAttribute } from "./student-course-attribute";

export interface Student {
  id: string;
  name: string;
  identifier: string;
  gender: string;
  active: boolean;
  courses: StudentCourseAttribute[];
}
