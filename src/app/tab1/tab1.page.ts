import { Component, OnInit } from "@angular/core";
import * as Favourites from "../../assets/favourites.json";

@Component({
  selector: "app-tab1",
  templateUrl: "tab1.page.html",
  styleUrls: ["tab1.page.scss"]
})
export class Tab1Page implements OnInit {

  favourites = Favourites["default"];

  constructor() {

  }

  ngOnInit() {
    console.log(this.favourites);
  }
}
