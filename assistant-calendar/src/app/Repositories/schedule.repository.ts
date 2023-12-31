// schedule.repository.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Schedule } from '../Models/schedule.model';
import {ScheduleRepositoryInterface} from "./Interfaces/schedule.repository.interface";
import { Event } from '../Models/event.model';

@Injectable({
  providedIn: 'root',
})
export class ScheduleRepository implements ScheduleRepositoryInterface {
  // check with whoever is working on backend for apiURL
  private apiUrl = 'https://academic-calendar-backend.onrender.com/api/schedules';

  constructor(private http: HttpClient) {}

  getAllSchedules(): Observable<Schedule[]> {
    return this.http.get<Schedule[]>(this.apiUrl);
  }

  getScheduleById(scheduleId: string, token:string) {
    return this.http.get<any>(`${this.apiUrl}/schedule/${scheduleId}/${token}`);
  }


  getScheduleByName(scheduleName: string): Observable<Schedule>{
    return this.http.get<Schedule>(`${this.apiUrl}/name/${scheduleName}`);
  }

  getScheduleByOwner(ownerId: string): Observable<Schedule>{
    return this.http.get<Schedule>(`${this.apiUrl}/owner/${ownerId}`);
  }

  createSchedule(schedule: Schedule): Observable<any> {
    return this.http.post<Schedule>(this.apiUrl, schedule);
  }

  createEvents(body: { id: string | undefined; events: Event[] }, scheduleId: string, token: string) {
    return this.http.patch<any>(`${this.apiUrl}/schedule/${scheduleId}/${token}/createEvents`, body);
  }

  updateSchedule(schedule: Schedule, scheduleId: string, token:string): Observable<Schedule> {
    return this.http.put<Schedule>(`${this.apiUrl}/${scheduleId}/${token}`, schedule);
  }

  deleteSchedule(token:string, scheduleId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/schedule/${scheduleId}/${token}`);
  }

  getOwnedSchedules(tokenId: string):Observable<any>{
    return this.http.get(`${this.apiUrl}/user/${tokenId}/owns`);
  }

  getSubscribedSchedules(tokenId: string):Observable<any>{
    return this.http.get(`${this.apiUrl}/user/${tokenId}/subscribed`);
  }

}
