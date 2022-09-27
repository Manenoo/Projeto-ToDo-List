import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AuthenticationService } from "../shared/authentication-service";
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
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