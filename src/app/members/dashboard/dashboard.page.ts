import { Component, OnInit, AfterViewInit } from "@angular/core";
import { AuthenticationService } from "./../../services/authentication.service";
import { UserInterface } from "src/app/interfaces";
import { Storage } from "@ionic/storage";
import { UserService } from "src/app/services/user.service";
import { Location } from "@angular/common";
import { Router } from "@angular/router";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.page.html",
  styleUrls: ["./dashboard.page.scss"]
})
export class DashboardPage implements OnInit {
  user: UserInterface = null;

  constructor(
    private authenticationService: AuthenticationService,
    private storage: Storage,
    private userService: UserService,
    private _location: Location,
    private router: Router
  ) {
    // this.authenticationService.getUserData();
    // this.getUserData();
    // this.authenticationService.userChange.subscribe(user => {
    //   console.log(user);
    // });
  }

  async ngOnInit() {
    // this.authenticationService.getUserData();
    await this.getUserData();
  }

  async getUserData() {
    await this.storage.get("auth-token").then(token => {
      if (token) {
        this.userService.getUser(token).subscribe((data: UserInterface) => {
          console.log(data);
          this.user = data;
          return data;
        });
      }
    });
  }

  ionViewWillEnter(): void {
    // console.log(this.authenticationService.isAuthenticated());
    // this.authenticationService.checkToken();
    // if (!this.authenticationService.isAuthenticated()) {
    //   this.router.navigate(["login"]);
    // }
  }

  goBack() {
    // this._location.back();
    this.router.navigate(["/page/tabs/tab1"]);
  }

  logout() {
    this.authenticationService.logout();
  }
}
