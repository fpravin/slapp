import { Injectable } from "@angular/core";
import { Platform } from "@ionic/angular";
import { Storage } from "@ionic/storage";
import { BehaviorSubject } from "rxjs";
import { UserService } from "./user.service";
import {
  UserInterface,
  ToastMessageInterface,
  LoginDataInterface
} from "./../interfaces";
import { first, tap } from "rxjs/operators";
import { ToastService } from "./common/toast.service";
import { Theme } from "../enum";
import { Router } from "@angular/router";

const TOKEN_KEY = "auth-token";

@Injectable({
  providedIn: "root"
})
export class AuthenticationService {
  public authenticationState = new BehaviorSubject(false);

  constructor(
    private storage: Storage,
    private plt: Platform,
    private userService: UserService,
    private toastService: ToastService,
    private router: Router
  ) {
    this.plt.ready().then(() => {
      this.checkToken();
    });
  }

  checkToken() {
    this.storage.get(TOKEN_KEY).then(res => {
      if (res) {
        this.authenticationState.next(true);
      }
    });
  }

  login(user: LoginDataInterface) {
    // this.userService.login(user).subscribe(
    //   data => {
    //     console.log(data);
    //     this.authenticationState.next(true);
    //   },
    //   err => {
    //     console.log(err);
    //   }
    // );

    return this.userService
      .login(user)
      .pipe(first())
      .subscribe(
        data => {
          this.toastService.showToast("You're logged in.", Theme.SUCCESS);
          this.storage
            .set(TOKEN_KEY, data.token_type + " " + data.access_token)
            .then(() => {
              this.authenticationState.next(true);
              this.router.navigate(["dashboard"]);
            });
          console.log(data);
        },
        error => {
          this.toastService.showToast("You're not logged in.", Theme.WARING);
          console.log(error);
          // this.alertService.error(error);
          // this.loading = false;
        }
      );
  }

  logout() {
    return this.storage.remove(TOKEN_KEY).then(() => {
      this.authenticationState.next(false);
      this.router.navigate(["login"]);
    });
  }

  isAuthenticated() {
    return this.authenticationState.value;
  }
}
