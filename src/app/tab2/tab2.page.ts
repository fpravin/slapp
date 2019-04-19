import { Component, OnInit } from "@angular/core";
import { Platform } from "@ionic/angular";
import { Map, latLng, tileLayer, Layer, marker } from "leaflet";
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
  GoogleMapsAnimation
} from "@ionic-native/google-maps/ngx";

@Component({
  selector: "app-tab2",
  templateUrl: "tab2.page.html",
  styleUrls: ["tab2.page.scss"]
})
export class Tab2Page implements OnInit {
  // map: Map;
  test: any;
  map: GoogleMap;

  constructor(private platform: Platform) {
    navigator.geolocation.getCurrentPosition(geoLocation => {
      this.test = new leaflet.LatLng(
        geoLocation.coords.latitude,
        geoLocation.coords.longitude
      );
    });
  }

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
        target: {
          lat: 43.0741904,
          lng: -89.3809802
        },
        zoom: 18,
        tilt: 30
      }
    };

    this.map = GoogleMaps.create("map_canvas", mapOptions);

    this.map.one(GoogleMapsEvent.MAP_READY).then(() => {
      const marker: Marker = this.map.addMarkerSync({
        title: "Ionic",
        icon: "blue",
        animation: GoogleMapsAnimation.DROP,
        position: {
          lat: 43.0741904,
          lng: -89.3809802
        }
      });
      marker.on(GoogleMapsEvent.MARKER_CLICK).subscribe(d => {
        alert("clicked");
      });

      this.map.on(GoogleMapsEvent.MAP_DRAG).subscribe(d => {
        console.log(d);
      });
    });
  }

  ionViewDidEnter() {}
}
