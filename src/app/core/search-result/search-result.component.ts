import { Component, OnInit } from "@angular/core";
import { SearchResultSubscriberService } from "./search-result-subscriber.service";
import { takeUntil } from "rxjs/operators";
import { Subject } from "rxjs";
import * as Places from "../../../assets/Places.json";
import { Router } from "@angular/router";
import { LocationDetailService } from "../location-detail/location-detail.service";

@Component({
  selector: "app-search-result",
  templateUrl: "./search-result.component.html",
  styleUrls: ["./search-result.component.scss"]
})
export class SearchResultComponent implements OnInit {
  destroySubject$: Subject<void> = new Subject();
  places = Places["default"];
  constructor(
    private searchResultSubscriberService: SearchResultSubscriberService,
    private locationDetailService: LocationDetailService,
    private router: Router
  ) {}

  ngOnInit() {
  }

  close() {
    this.searchResultSubscriberService.hideModel();
  }

  routeTo(place) {
    this.searchResultSubscriberService.hideModel();
    this.locationDetailService.showModel(place.id);
    // this.router.navigate(["/place-detail", place.id]);
  }
}
