import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ItemService {
  constructor(private http: HttpClient) {}

  getItem(data: any) {
    return this.http.post<any>(`${environment.apiUrl}/item/get-all`, data);
  }

  findByItem(data: any) {
    return this.http.post<any>(`${environment.apiUrl}/item/findBy`, data);
  }

  insertUpdateItem(data: any) {
    console.log(data, 'data');
    return this.http.post<any>(`${environment.apiUrl}/item/save`, data);
  }

  deleteItem(data: any) {
    return this.http.post<any>(`${environment.apiUrl}/item/delete`, data);
  }
}
