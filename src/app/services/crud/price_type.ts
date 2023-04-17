import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PriceTypeService {
  constructor(private http: HttpClient) {}

  getPriceType(data: any) {
    return this.http.post<any>(
      `${environment.apiUrl}/price_type/get-all`,
      data
    );
  }

  findByPriceType(data: any) {
    return this.http.post<any>(`${environment.apiUrl}/price_type/findBy`, data);
  }

  insertUpdatePriceType(data: any) {
    return this.http.post<any>(`${environment.apiUrl}/price_type/save`, data);
  }

  deletePriceType(data: any) {
    return this.http.post<any>(`${environment.apiUrl}/price_type/delete`, data);
  }
}
