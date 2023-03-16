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

  user: any;
  role: any;
  register(data: any) {
    return this.http.post<any>(`${environment.apiUrl}/auth/register`, data);
  }

  login(data: any) {
    // this.getIdTeamHttp();
    return this.http.post<any>(`${environment.apiUrl}/auth/login`, data).pipe(
      map((user) => {
        console.log(user, 'userr');
        this.role = user.role.name;
        localStorage.setItem('user', JSON.stringify(user));
        switch (this.role) {
          case 'admin':
            this.router.navigate(['/order-waiting']);
            break;
          case 'client':
            this.router.navigate(['/dashboard']);
            break;
          default:
            this.router.navigate(['/dashboard']);
        }
        return user;
      })
    );
  }
  getMe(data: any) {
    return this.http.post<any>(`${environment.apiUrl}/auth/check`, data).pipe(
      map(
        (res) => {
          console.log(res, 'resulta de la check??');
          switch (res[0].role.name) {
            case 'admin':
              console.log('case admin');
              this.router.navigate(['/order-waiting']);
              break;
            case 'client':
              console.log('case client');
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
      let a: any = localStorage.getItem('user');
      if (a == null) {
        this.disconnect();
      } else {
        let us = JSON.parse(a).role.name;
        this.role = us;
        return this.role;
      }
    }
  }

  disconnect() {
    localStorage.removeItem('user');

    this.router.navigate(['/login']);
    this.alert.info('Reconnexion...');
  }
}
