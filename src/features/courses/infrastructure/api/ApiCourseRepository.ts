import { Course } from '../../domain/Course';
import { CourseRepository } from '../../domain/CourseRepository';

export class ApiCourseRepository implements CourseRepository {
  constructor(private readonly baseUrl: string = '/api/courses') {}

  async getStudentCourses(): Promise<Course[]> {
    const res = await fetch(this.baseUrl, {
      headers: { Authorization: `Bearer ${localStorage.getItem('access_token')}` }
    });
    if (!res.ok) throw new Error("Impossible de charger les cours");
    return res.json();
  }
}
