import { Component, OnInit, Renderer2, ViewChild, ElementRef } from "@angular/core";
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
import { PlaceService } from "../services/place.service";
import { Place } from "../interfaces";
import { Storage } from "@ionic/storage";
import { IonSearchbar } from "@ionic/angular";

@Component({
  selector: "app-tab2",
  templateUrl: "tab2.page.html",
  styleUrls: ["tab2.page.scss"]
})

export class Tab2Page implements OnInit {

  @ViewChild("PlaceSrarchBar") placeSrarchBar: IonSearchbar;
  @ViewChild("filteWrapper") filteWrapperElement: ElementRef;
  @ViewChild("forYou") forYouElement: ElementRef;

  // map: Map;
  test: any;
  map: GoogleMap;
  latLng: ILatLng;
  // places: any[] = Places["default"];
  places: Place[] = [];


  constructor(
    private platform: Platform,
    private renderer: Renderer2,
    private searchResultSubscriberService: SearchResultSubscriberService,
    private placeService: PlaceService,
    private storage: Storage
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

    this.storage.get("place").then(res => {
      if (res) { this.places = res; }
    });
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
        icon: {
          url: "assets/icon/icon-marker-user.png",
        },
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

        this.renderer.removeClass(this.filteWrapperElement.nativeElement, "animate-in");
        this.renderer.addClass(this.filteWrapperElement.nativeElement, "animate-out");
        this.renderer.removeClass(this.forYouElement.nativeElement, "animate-in");
        this.renderer.addClass(this.forYouElement.nativeElement, "animate-out");
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

        this.renderer.removeClass(this.filteWrapperElement.nativeElement, "animate-out");
        this.renderer.addClass(this.filteWrapperElement.nativeElement, "animate-in");
        this.renderer.removeClass(this.forYouElement.nativeElement, "animate-out");
        this.renderer.addClass(this.forYouElement.nativeElement, "animate-in");
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
        lat: +x[0],
        lng: +x[1]
      };

      const marker: Marker = this.map.addMarkerSync({
        title: v.name,
        icon: {
          url: "assets/icon/icon-marker.png",
          size: {
            width: 16,
            height: 16
          }
        },
        animation: GoogleMapsAnimation.DROP,
        position: latLng,
      });
    });

  }

  ionViewDidEnter() { }

  onClear(e) {
    this.searchResultSubscriberService.hideModel();
  }


  onFocus() {
    this.searchResultSubscriberService.showModel();
    setTimeout(() => {
      this.placeSrarchBar.setFocus();
    }, 100);
  }

  onChange(event: any): void {
    this.placeSrarchBar.setFocus();
    this.searchResultSubscriberService.filteredPlace(event["detail"]["value"].toLowerCase());
  }

  filterPlaces(category: string): void {
    switch (category) {
      // case 'restaurent' : 
    }
  }
}
