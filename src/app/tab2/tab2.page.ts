import { Component, OnInit, AfterViewInit, ViewChild } from "@angular/core";
import { Platform } from "@ionic/angular";
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  LatLng,
  MarkerOptions,
  Marker
} from "@ionic-native/google-maps";

@Component({
  selector: "app-tab2",
  templateUrl: "tab2.page.html",
  styleUrls: ["tab2.page.scss"]
})
export class Tab2Page implements OnInit, AfterViewInit {
  @ViewChild("map") element;
  constructor(private platform: Platform) {}

  async ngOnInit() {
    await this.platform.ready();
    await this.initMap();
  }

  ngAfterViewInit() {}

  ionViewDidEnter() {
    console.log("call ionViewDidLoad");
    this.platform.ready().then(() => {
      this.initMap();
    });
  }

  initMap() {
    const map: GoogleMap = GoogleMaps.create(this.element.nativeElement);

    map.one(GoogleMapsEvent.MAP_READY).then((data: any) => {
      const coordinates: LatLng = new LatLng(33.6396965, -84.4304574);

      const position = {
        target: coordinates,
        zoom: 17
      };

      map.animateCamera(position);

      const markerOptions: MarkerOptions = {
        position: coordinates,
        icon: "assets/images/icons8-Marker-64.png",
        title: "Our first POI"
      };

      const marker = map.addMarker(markerOptions).then((marker: Marker) => {
        marker.showInfoWindow();
      });
    });
  }
}
