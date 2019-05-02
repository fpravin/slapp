import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  Renderer2
} from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Location } from "@angular/common";
import * as Places from "../../../assets/Places.json";
import { NavParams } from "@ionic/angular";
import { LocationDetailService } from "./location-detail.service.js";

@Component({
  selector: "app-location-detail",
  templateUrl: "./location-detail.component.html",
  styleUrls: ["./location-detail.component.scss"]
})
export class LocationDetailComponent implements OnInit {
  constructor(
    private locationDetailService: LocationDetailService,
    private navParams: NavParams,
    private renderer: Renderer2
  ) {
    const id: string = this.navParams.get("id");
    this.place = this.places.find(d => {
      return d.id.toString() === id.toString();
    });
  }
  @ViewChild("moreDetails")
  moreDetailElem: ElementRef;

  places = Places["default"];
  place: any;
  ratings: number[] = [];
  imgPath: string;
  promotions: string[];

  ngOnInit() {
    this.setRatings();
    this.promotions = [
      "assets/promotions/promo1.jpg",
      "assets/promotions/promo2.jpg",
      "assets/promotions/promo3.jpg",
      "assets/promotions/promo4.jpg",
      "assets/promotions/promo5.jpg",
      "assets/promotions/promo6.jpg",
      "assets/promotions/promo7.jpg",
      "assets/promotions/promo8.jpg",
      "assets/promotions/promo9.jpg",
      "assets/promotions/promo.png"
    ];
  }

  setRatings() {
    for (let i = 0; i < this.place.rating; i++) {
      this.ratings.push(i);
    }
  }

  goBack() {
    this.locationDetailService.hideModel();
  }
  test(i): void {
    this.renderer.addClass(this.moreDetailElem.nativeElement, "clicked");
    this.imgPath = this.promotions[i];
    console.log(i);
  }

  close(): void {
    this.renderer.removeClass(this.moreDetailElem.nativeElement, "clicked");
  }
}
