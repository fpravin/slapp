import { Component, OnInit } from "@angular/core";
import { Storage } from "@ionic/storage";
import { FavouriteService } from "../services/favourite.service";
import { UserInterface } from "../interfaces";

const TOKEN_KEY = "auth-token";

@Component({
  selector: "app-tabs",
  templateUrl: "tabs.page.html",
  styleUrls: ["tabs.page.scss"]
})


export class TabsPage implements OnInit {

  user: UserInterface;

  constructor(private storage: Storage, private favouriteService: FavouriteService) {

  }

  async ngOnInit() {
    // this.storage.remove("favourite");

    // this.storage.ready().then(() => this.storage.set("favourite", []));

    this.storage.keys().then(keys => {

      const foundKey = keys.find(k => {
        return k === "user";
      });

      if (foundKey === "user") {

        this.storage.get(foundKey).then(user => {
          this.storage.get(TOKEN_KEY).then(token => {
            this.caccheData(token, user.id);
          });
        });




      } else {

      }
    });


  }

  async caccheData(token: string, id: string): Promise<void> {
    await this.favouriteService.cacheFavourite(token, id);
    // cache favourites
  }
}
