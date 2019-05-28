import { Component, OnInit } from "@angular/core";
import { Storage } from "@ionic/storage";
import { PlaceService, CategoryService } from "../../services";
import { Router } from "@angular/router";
import { BehaviorSubject } from "rxjs";
import { UserService } from "src/app/services/user.service";

const TOKEN_KEY = "auth-token";

@Component({
  selector: "app-welcome",
  templateUrl: "./welcome.page.html",
  styleUrls: ["./welcome.page.scss"],
})

export class WelcomePage implements OnInit {

  isLoading: BehaviorSubject<Boolean> = new BehaviorSubject(false);
  loaderText: string = "";

  constructor(
    private storage: Storage,
    private placeService: PlaceService,
    private categoryService: CategoryService,
    private router: Router,
    private userService: UserService
  ) { }

  async ngOnInit() {

    this.storage.keys().then(keys => {

      const foundKey = keys.find(k => {
        return k === "auth-token";
      });

      if (foundKey === TOKEN_KEY) {

        this.storage.get(foundKey).then(token => {
          this.caccheData(token);
        });

      } else {

      }
    });

    // await this.placeService.get().subscribe(place => { });
    // await this.categoryService.get().subscribe(place => { });

  }

  async caccheData(token: string): Promise<void> {
    this.isLoading.next(true);
    this.loaderText = "Fetching Data!";

    await this.placeService.cachePlaces(token);
    await this.categoryService.cacheCategory(token);
    await this.userService.cacheUser(token);
    // cache favourites

    setTimeout(() => {
      this.loaderText = "Initializing App!";
    }, 5000);


    setTimeout(() => {
      this.loaderText = "";
      this.isLoading.next(false);
      this.router.navigate(["page/tabs/tab2"]);
    }, 500);
  }

}
