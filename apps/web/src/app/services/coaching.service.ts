import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface CheckInDto {
  weight: number;
  notes?: string;
}

export interface CheckIn {
  _id: string;
  user: string;
  weight: number;
  notes: string;
  createdAt: string;
}

@Injectable({
  providedIn: 'root'
})
export class CoachingService {
  private http = inject(HttpClient);
  private apiUrl = '/api/coaching/check-ins';

  getCheckIns(): Observable<CheckIn[]> {
    return this.http.get<CheckIn[]>(this.apiUrl);
  }

  submitCheckIn(data: CheckInDto): Observable<CheckIn> {
    return this.http.post<CheckIn>(this.apiUrl, data);
  }
}
