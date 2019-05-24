import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  Renderer2,
  Input
} from "@angular/core";
import * as Places from "../../../assets/Places.json";
import { NavParams } from "@ionic/angular";
import { LocationDetailService } from "./location-detail.service.js";
import { Storage } from "@ionic/storage";
import { Place } from "src/app/interfaces/index.js";

@Component({
  selector: "app-location-detail",
  templateUrl: "./location-detail.component.html",
  styleUrls: ["./location-detail.component.scss"]
})
export class LocationDetailComponent implements OnInit {

  @Input() id: any;
  @ViewChild("moreDetails")
  moreDetailElem: ElementRef;

  // places = Places["default"];
  places: Place[] = [];
  place: Place;

  ratings: number[] = [];
  imgPath: string;
  promotions: string[];
  promotionStories: string[];
  tempPromotionStories: string[];
  currentPos: number = 0;
  showStoryNavButton: boolean = false;


  constructor(
    private locationDetailService: LocationDetailService,
    private navParams: NavParams,
    private renderer: Renderer2,
    private storage: Storage
  ) {
  }

  async ngOnInit() {

    await this.storage.get("place").then(res => {
      if (res) { this.places = res; }
    });

    this.place = this.places.find(d => {
      return d.id === this.id;
    });

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
    console.log(this.place);
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
