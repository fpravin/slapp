import { Component, OnInit } from "@angular/core";
import { Storage } from "@ionic/storage";
import { PlaceService } from "../services/place.service";

@Component({
  selector: "app-tabs",
  templateUrl: "tabs.page.html",
  styleUrls: ["tabs.page.scss"]
})
export class TabsPage implements OnInit {
  constructor(private storage: Storage, private placeService: PlaceService) {

  }

  async ngOnInit() {
    await this.placeService.getPlaces().subscribe(place => { });
  }
}
