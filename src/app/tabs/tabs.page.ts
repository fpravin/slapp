import { Component, OnInit } from "@angular/core";
import { Storage } from "@ionic/storage";
import { PlaceService, CategoryService } from "../services";

@Component({
  selector: "app-tabs",
  templateUrl: "tabs.page.html",
  styleUrls: ["tabs.page.scss"]
})

export class TabsPage implements OnInit {
  constructor(private storage: Storage, private placeService: PlaceService, private categoryService: CategoryService) {

  }

  async ngOnInit() {
    await this.placeService.get().subscribe(place => { });
    await this.categoryService.get().subscribe(place => { });
  }
}
