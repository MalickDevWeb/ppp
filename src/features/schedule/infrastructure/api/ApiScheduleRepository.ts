import { CourseSession } from '../../domain/Schedule';
import { ScheduleRepository } from '../../domain/ScheduleRepository';

export class ApiScheduleRepository implements ScheduleRepository {
  constructor(private readonly baseUrl: string = '/api/schedule') {}

  async getWeeklySchedule(): Promise<CourseSession[]> {
    const res = await fetch(this.baseUrl, {
      headers: { Authorization: `Bearer ${localStorage.getItem('access_token')}` }
    });
    
    if (!res.ok) {
      throw new Error("Erreur de récupération de l'emploi du temps");
    }
    
    return res.json();
  }
}
