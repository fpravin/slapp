import { Component, OnInit } from "@angular/core";
import * as Recommend from "../../assets/recommend.json";

@Component({
  selector: "app-tab3",
  templateUrl: "tab3.page.html",
  styleUrls: ["tab3.page.scss"]
})
export class Tab3Page implements OnInit {
  favourites = Recommend["default"];

  constructor() {

  }

  ngOnInit() {
    console.log(this.favourites);
  }
}
