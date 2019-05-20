import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Location } from "@angular/common";
import * as Places from "../../../assets/Places.json";

@Component({
  selector: "app-place-detail",
  templateUrl: "./place-detail.page.html",
  styleUrls: ["./place-detail.page.scss"]
})
export class PlaceDetailPage implements OnInit {
  places = Places["default"];
  place: any;
  ratings: number[] = [];
  constructor(
    private activatedRoute: ActivatedRoute,
    private _location: Location
  ) {
    this.activatedRoute.params.subscribe(params => {
      this.place = this.places.find(d => {
        return d.id.toString() === params.id;
      });
    });
  }

  ngOnInit() {
    this.setRatings();
  }

  setRatings() {
    for (let i = 0; i < this.place.rating; i++) {
      this.ratings.push(i);
    }
  }

  goBack() {
    this._location.back();
  }
}
