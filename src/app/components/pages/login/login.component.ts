import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertService } from 'src/app/services/alert.service';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(private alert: AlertService, private auth: AuthService) {}

  async ngOnInit() {
    let id = JSON.parse(localStorage.getItem('user')).id;
    await this.auth.getMe({ id }).subscribe(
      (res) => {},
      (error) => {
        this.alert.error('Email ou mot de passe incorrect');
      }
    );
  }

  credential = new FormGroup({
    mail: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });
  async login() {
    await this.auth.login(this.credential.value).subscribe(
      (res) => {},
      (error) => {
        this.alert.error('Email ou mot de passe incorrect');
      }
    );
  }
}
