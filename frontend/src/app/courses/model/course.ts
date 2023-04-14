import { CourseStudentAttribute } from './course-student-attribute';

export interface Course {
  id: string;
  name: string;
  active: boolean;
  students: CourseStudentAttribute[];
}
