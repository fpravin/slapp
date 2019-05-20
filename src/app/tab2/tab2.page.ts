<<<<<<< HEAD
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
import * as Places from "../../assets/Places.json";
=======
import { Component } from "@angular/core";
import { Platform } from "@ionic/angular";
import { Map, latLng, tileLayer, Layer, marker } from "leaflet";
import leaflet from "leaflet";
>>>>>>> master

@Component({
  selector: "app-tab2",
  templateUrl: "tab2.page.html",
  styleUrls: ["tab2.page.scss"]
})
<<<<<<< HEAD
export class Tab2Page implements OnInit {


  // map: Map;
  test: any;
  map: GoogleMap;
  latLng: ILatLng;
  places: any[] = Places["default"];


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
      },
      styles: [
        {
          "featureType": "poi.business",
          "stylers": [
            {
              "visibility": "off"
            }
          ]
        },
        {
          "featureType": "poi.park",
          "elementType": "labels.text",
          "stylers": [
            {
              "visibility": "off"
            }
          ]
        }
      ]
    };

    this.map = GoogleMaps.create("map_canvas", mapOptions);

    this.map.one(GoogleMapsEvent.MAP_READY).then(() => {
      const marker: Marker = this.map.addMarkerSync({
        title: "Ionic",
        icon: "blue",
        animation: GoogleMapsAnimation.DROP,
        position: this.latLng
      });

      this.markLocations();



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

  markLocations() {

    this.places.forEach((v, i) => {
      const x = v.latlang.split(",");

      const latLng: ILatLng = {
        lat: x[0],
        lng: x[1]
      };

      const marker: Marker = this.map.addMarkerSync({
        title: v.name,
        icon: "blue",
        animation: GoogleMapsAnimation.DROP,
        position: latLng,
      });
    });

  }

  ionViewDidEnter() { }

  onFocus(e) {
    this.searchResultSubscriberService.showModel();
  }

  onClear(e) {
    this.searchResultSubscriberService.hideModel();
=======
export class Tab2Page {
  map: Map;
  test: any;

  constructor(private platform: Platform) {
    navigator.geolocation.getCurrentPosition(geoLocation => {
      this.test = new leaflet.LatLng(
        geoLocation.coords.latitude,
        geoLocation.coords.longitude
      );
    });
  }

  ionViewDidEnter() {
    this.leafletMap();
  }

  leafletMap() {
    navigator.geolocation.getCurrentPosition(geoLocation => {
      const latlng = new leaflet.LatLng(
        geoLocation.coords.latitude,
        geoLocation.coords.longitude
      );

      this.map = leaflet.map("map", {
        center: latlng,
        zoom: 13
      });

      this.map.on("zoom", s => {
        // drawGrid();
        console.log(s);
      });

      this.map.on("moveend", w => {
        console.log(w);
        // console.log(w.getBounds());
        console.log(this.map.getBounds());
      });

      const position = leaflet
        .tileLayer(
          "http://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}",
          {
            attribution: "edupala.com © ionic LeafLet"
          }
        )
        .addTo(this.map);

      const marker = leaflet
        .marker(latlng, {
          icon: leaflet.icon({
            iconSize: [25, 41],
            iconAnchor: [13, 41],
            iconUrl: "leaflet/marker-icon.png",
            shadowUrl: "leaflet/marker-shadow.png"
          })
        })
        .addTo(this.map);

      marker.bindPopup("<p>Tashi Delek.<p>Delhi</p>");
    });
  }

  goTo(): void {
    // this.map.panTo(new leaflet.LatLng(40.737, -73.923));
    this.map.flyTo(this.test, this.map.getZoom(), {
      animate: true,
      pan: {
        duration: 1
      }
    });
>>>>>>> master
  }
}
