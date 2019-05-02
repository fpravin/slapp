import { Component, OnInit, Renderer2 } from "@angular/core";
import { Platform } from "@ionic/angular";
// import { Map, latLng, tileLayer, Layer, marker } from "leaflet";
import leaflet from "leaflet";

import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  GoogleMapOptions,
  CameraPosition,
  MarkerOptions,
  Marker,
  Environment,
  GoogleMapsAnimation,
  LatLng,
  ILatLng
} from "@ionic-native/google-maps/ngx";
import { SearchResultSubscriberService } from "../core/search-result/search-result-subscriber.service";

@Component({
  selector: "app-tab2",
  templateUrl: "tab2.page.html",
  styleUrls: ["tab2.page.scss"]
})
export class Tab2Page implements OnInit {
  constructor(
    private platform: Platform,
    private renderer: Renderer2,
    private searchResultSubscriberService: SearchResultSubscriberService
  ) {
    navigator.geolocation.getCurrentPosition(geoLocation => {
      this.latLng = {
        lat: geoLocation.coords.latitude,
        lng: geoLocation.coords.longitude
      };
    });
  }
  // map: Map;
  test: any;
  map: GoogleMap;
  latLng: ILatLng;

  async ngOnInit() {
    await this.platform.ready();
    await this.loadMap();
  }

  loadMap() {
    // This code is necessary for browser
    Environment.setEnv({
      API_KEY_FOR_BROWSER_RELEASE: "AIzaSyAEb2vijCsPLIppJ9rpF0wKFQKOfZLYp1I",
      API_KEY_FOR_BROWSER_DEBUG: "AIzaSyAEb2vijCsPLIppJ9rpF0wKFQKOfZLYp1I"
    });

    const mapOptions: GoogleMapOptions = {
      camera: {
        target: this.latLng,
        zoom: 13
      },
      controls: {
        zoom: false
      }
    };

    this.map = GoogleMaps.create("map_canvas", mapOptions);

    this.map.one(GoogleMapsEvent.MAP_READY).then(() => {
      const marker: Marker = this.map.addMarkerSync({
        title: "Ionic",
        icon: "blue",
        animation: GoogleMapsAnimation.DROP,
        position: this.latLng
      });

      this.map.setCameraTarget(this.latLng);
      this.map.animateCamera({
        target: this.latLng,
        zoom: 16,
        duration: 2000
      });

      marker.on(GoogleMapsEvent.MARKER_CLICK).subscribe(d => {
        alert("clicked");
      });

      this.map.on(GoogleMapsEvent.MAP_DRAG_START).subscribe(d => {
        this.searchResultSubscriberService.hideModel();
        this.renderer.removeClass(
          document.querySelector("ion-tab-bar"),
          "animate-in"
        );
        this.renderer.addClass(
          document.querySelector("ion-tab-bar"),
          "animate-out"
        );
      });

      this.map.on(GoogleMapsEvent.MAP_DRAG_END).subscribe(d => {
        this.renderer.removeClass(
          document.querySelector("ion-tab-bar"),
          "animate-out"
        );
        this.renderer.addClass(
          document.querySelector("ion-tab-bar"),
          "animate-in"
        );
      });

      this.map.on(GoogleMapsEvent.MAP_CLICK).subscribe(d => {
        this.searchResultSubscriberService.hideModel();
      });
    });
  }

  ionViewDidEnter() {}

  onFocus(e) {
    this.searchResultSubscriberService.showModel();
  }

  onClear(e) {
    this.searchResultSubscriberService.hideModel();
  }
}
