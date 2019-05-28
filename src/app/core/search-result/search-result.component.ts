import { Component, OnInit, Input } from "@angular/core";
import { takeUntil } from "rxjs/operators";
import { Subject } from "rxjs";
import * as Places from "../../../assets/Places.json";
import { Router } from "@angular/router";
import { LocationDetailService, SearchResultService } from "../../services/subscriber";
import { Storage } from "@ionic/storage";
import { Place } from "src/app/interfaces";
import { LocationDetailComponent } from "../location-detail/location-detail.component";

@Component({
  selector: "app-search-result",
  templateUrl: "./search-result.component.html",
  styleUrls: ["./search-result.component.scss"]
})
export class SearchResultComponent implements OnInit {

  @Input() value: any;

  destroySubject$: Subject<void> = new Subject();
  // places = Places["default"];
  places: Place[] = [];
  tempPlace: Place[] = [];
  recentlySearchedPlaces: Place[] = [];
  title: string = "";

  isReceltlySearchAvailable: boolean = true;

  constructor(
    private searchResultService: SearchResultService,
    private locationDetailService: LocationDetailService,
    private router: Router,
    private storage: Storage
  ) {

    this.searchResultService.filterPlace.pipe(takeUntil(this.destroySubject$)).subscribe((text) => {

      const filteredPlaces: Place[] = this.tempPlace.filter(place => {
        return place.name.toLowerCase().includes(text);
      });

      if (filteredPlaces.length > 0) {
        this.isReceltlySearchAvailable = false;
        this.title = "Found Matches";
        this.places = [...filteredPlaces];
      }


    });
  }

  async ngOnInit() {

    this.title = "Recently Searched";
    this.isReceltlySearchAvailable = true;

    await this.storage.get("recentlySearchedPlaces").then(res => {
      if (res && res.length > 0) {
        this.isReceltlySearchAvailable = false;
        this.recentlySearchedPlaces = [...res];
        this.places = [...res];
      }
    });

    this.storage.get("place").then(res => {
      if (res) {
        this.tempPlace = JSON.parse(JSON.stringify(res));
      }
    });
  }

  close() {
    this.searchResultService.hideModel();
  }

  goTo(place) {
    this.searchResultService.hideModel();
    this.locationDetailService.showModel(LocationDetailComponent, place.id);

    const placeAlreadyAdded = this.recentlySearchedPlaces.find((p) => {
      return place.id === p.id;
    });

    if (!placeAlreadyAdded) { this.recentlySearchedPlaces.push(place); }
    this.storage.set("recentlySearchedPlaces", this.recentlySearchedPlaces);
  }
}
