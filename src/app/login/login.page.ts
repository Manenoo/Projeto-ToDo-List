import { Component,OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { userInfo } from 'os';
import { AuthenticationService } from "../shared/authentication-service";
import { User } from "../shared/user"

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  constructor(
    public authService: AuthenticationService,
    public router: Router,
    public user: User
  ) {}
  ngOnInit() {}
  logIn(email, password) {
    this.user.email = email;
    this.authService.SignIn(email.value, password.value)
      .then((res) => {
        if(this.authService.isEmailVerified) {
          this.authService.SetUserData(email.value);
          this.router.navigate(['home']);
          window.alert('Email is verified')          
        } else {
          window.alert('Email is not verified')
          return false;
        }
      }).catch((error) => {
        window.alert(error.message)
      })
  }
}