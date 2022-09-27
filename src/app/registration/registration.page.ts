import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { AuthenticationService } from "../shared/authentication-service";
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.page.html',
  styleUrls: ['./registration.page.scss'],
})
export class RegistrationPage implements OnInit {
  constructor(
    private nav: NavController,
    public authService: AuthenticationService,
    public router: Router
  ) { }
  ngOnInit() { }
  signUp(email, password) {
    this.authService.RegisterUser(email.value, password.value)
      .then((res) => {
        // Do something here
        this.authService.SendVerificationMail()
        this.router.navigate(['verify-email']);
      }).catch((error) => {
        window.alert(error.message)
      })
  }
  voltaHome(){
    this.nav.navigateForward('home');
    }
}