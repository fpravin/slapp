import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  Renderer2
} from "@angular/core";
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
  promotionStories: string[];
  tempPromotionStories: string[];
  currentPos: number = 0;
  showStoryNavButton: boolean = false;

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
    this.promotionStories = [...this.promotions];

  }

  setRatings() {
    for (let i = 0; i < this.place.rating; i++) {
      this.ratings.push(i);
    }
  }

  goBack() {
    this.locationDetailService.hideModel();
  }

  test(i: number): void {
    this.showStoryNavButton = true;
    this.currentPos = window.innerWidth * i;
    this.renderer.setStyle(document.querySelector(".promotion-images"), "right", this.currentPos + "px");

    setTimeout(() => {
      this.renderer.addClass(this.moreDetailElem.nativeElement, "clicked");
    }, 500);
  }

  close(): void {
    this.showStoryNavButton = false;
    this.currentPos = 0;
    this.renderer.removeClass(this.moreDetailElem.nativeElement, "clicked");
  }


  prev(): void {
    this.currentPos -= window.innerWidth;
    this.renderer.setStyle(document.querySelector(".promotion-images"), "right", this.currentPos + "px");
  }
  next(): void {
    this.currentPos += window.innerWidth;
    this.renderer.setStyle(document.querySelector(".promotion-images"), "right", this.currentPos + "px");
  }


}
