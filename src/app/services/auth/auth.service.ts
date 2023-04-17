import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { AlertService } from '../alert.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private http: HttpClient,
    private router: Router,
    private alert: AlertService
  ) {}
  private readonly TOKEN_KEY = 'authToken';

  user: any;
  role: any;
  register(data: any) {
    return this.http.post<any>(`${environment.apiUrl}/auth/register`, data);
  }

  login(data: any) {
    return this.http.post<any>(`${environment.apiUrl}/auth/login`, data).pipe(
      map((res) => {
        const token = res.token;
        const user = res.user;

        if (token) {
          sessionStorage.setItem(this.TOKEN_KEY, token);
        }

        if (user) {
          sessionStorage.setItem('user', JSON.stringify(user));
        }

        switch (user.role.name) {
          case 'admin':
            this.router.navigate(['/order-waiting']);
            break;
          case 'client':
            this.router.navigate(['/dashboard']);
            break;
          default:
            this.router.navigate(['/dashboard']);
        }

        return res.body;
      })
    );
  }

  getMe(data: any) {
    return this.http.post<any>(`${environment.apiUrl}/auth/check`, data).pipe(
      map(
        (res) => {
          switch (res[0].role.name) {
            case 'admin':
              this.router.navigate(['/order-waiting']);
              break;
            case 'client':
              this.router.navigate(['/dashboard']);

              break;
            default:
              this.router.navigate(['/dashboard']);
          }
        },
        (err) => {
          this.alert.info('Reconnexion...');
        }
      )
    );
  }

  getRole() {
    if (typeof this.role != 'undefined') {
      return this.role;
    } else {
      let a: any = sessionStorage.getItem('user');
      if (a == null) {
        this.disconnect();
      } else {
        let us = JSON.parse(a).role.name;
        this.role = us;
        return this.role;
      }
    }
  }
  getToken(): string | null {
    return sessionStorage.getItem(this.TOKEN_KEY);
  }
  disconnect() {
    sessionStorage.removeItem('user');

    this.router.navigate(['/login']);
    this.alert.info('Reconnexion...');
  }
}
