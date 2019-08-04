import { Component, OnInit } from "@angular/core";
import * as Recommend from "../../assets/recommend.json";
import { Storage } from "@ionic/storage";
import { MlServiceService } from "../services/ml-service.service.js";
import { Place } from "../interfaces/index.js";

@Component({
  selector: "app-tab3",
  templateUrl: "tab3.page.html",
  styleUrls: ["tab3.page.scss"]
})
export class Tab3Page implements OnInit {
  favourites: Place[] = [];

  constructor(private mlServiceService: MlServiceService) {

  }

  ngOnInit() {
    this.doMl();
  }

  doMl(): void {
    this.mlServiceService.runMl().then(recommendations => {
      this.favourites = [...recommendations];
    });
  }

  ionViewDidEnter() {
    this.doMl();
  }


}
