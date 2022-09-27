import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from "../shared/authentication-service";
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.page.html',
  styleUrls: ['./verify-email.page.scss'],
})
export class VerifyEmailPage implements OnInit {
  constructor(
    private nav: NavController,
    public authService: AuthenticationService
  ) { }
  ngOnInit() {
  }
  voltaHome(){
    this.nav.navigateForward('home');
    }
}