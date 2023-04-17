import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PatientService {
  constructor(private http: HttpClient) {}

  getPatient(data: any) {
    return this.http.post<any>(`${environment.apiUrl}/patient/get-all`, data);
  }

  findByPatient(data: any) {
    return this.http.post<any>(`${environment.apiUrl}/patient/findBy`, data);
  }

  insertUpdatePatient(data: any) {
    return this.http.post<any>(`${environment.apiUrl}/patient/save`, data);
  }

  deletePatient(data: any) {
    return this.http.post<any>(`${environment.apiUrl}/patient/delete`, data);
  }
}
