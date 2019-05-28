import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  Renderer2,
  Input,
  OnDestroy
} from "@angular/core";
import * as Places from "../../../assets/Places.json";
import { NavParams } from "@ionic/angular";
import { LocationDetailService } from "../../services/subscriber";
import { Storage } from "@ionic/storage";
import { Place, UserInterface } from "src/app/interfaces/index.js";
import { FavouriteService } from "src/app/services/favourite.service.js";
import { ToastService } from "src/app/services/common/toast.service.js";
import { Theme } from "../../enum";
import { MlServiceService } from "src/app/services/ml-service.service.js";

@Component({
  selector: "app-location-detail",
  templateUrl: "./location-detail.component.html",
  styleUrls: ["./location-detail.component.scss"]
})

export class LocationDetailComponent implements OnInit, OnDestroy {

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

  isFavourite: boolean = false;

  user: UserInterface;
  token: string;

  constructor(
    private locationDetailService: LocationDetailService,
    private navParams: NavParams,
    private renderer: Renderer2,
    private storage: Storage,
    private favouriteService: FavouriteService,
    private toastService: ToastService,
    private mlServiceService: MlServiceService,
  ) {
  }

  async ngOnInit() {

    await this.storage.get("place").then(res => {
      if (res) { this.places = res; }
    });

    this.place = this.places.find(d => {
      return d.id === this.id;
    });

    await this.storage.get("favourite").then(res => {
      if (res !== null) {
        res.forEach(fav => {
          if (fav.place_id === this.place.id) {
            this.isFavourite = true;
          }
        });
      }
    });


    await this.storage.get("user").then(user => { this.user = user; });
    await this.storage.get("auth-token").then(token => { this.token = token; });

    // await this.caccheData(this.token, this.user.id);



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

    this.mlServiceService.setvisitCount(+this.place.id);
  }

  async ngOnDestroy() {
    await this.caccheData(this.token, this.user.id);
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

  async toggleFavourite(): Promise<void> {
    this.isFavourite = !this.isFavourite;

    const favouriteData = {
      user_id: this.user.id,
      place_id: this.place.id
    };

    this.favouriteService.toggleFavourite(favouriteData, this.token).toPromise().then(
      d => {
        console.log(d);
        this.toastService.showToast("You're logged in.", Theme.SUCCESS);
      }
    ).catch(
      err => {
        console.log(err);
      }
    );

    await this.caccheData(this.token, this.user.id);
  }

  async caccheData(token: string, id: string): Promise<void> {
    await this.favouriteService.cacheFavourite(token, id);
  }

}
