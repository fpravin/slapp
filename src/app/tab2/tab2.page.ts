import { Component, OnInit, Renderer2, ViewChild, ElementRef, AfterViewInit } from "@angular/core";
import { Platform } from "@ionic/angular";
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
import { SearchResultService } from "../services/subscriber";
import * as Places from "../../assets/Places.json";
import { PlaceService } from "../services/place.service";
import { Place, Category } from "../interfaces";
import { Storage } from "@ionic/storage";
import { IonSearchbar } from "@ionic/angular";
import { SearchResultComponent } from "../core/search-result/search-result.component";

@Component({
  selector: "app-tab2",
  templateUrl: "tab2.page.html",
  styleUrls: ["tab2.page.scss"]
})

export class Tab2Page implements OnInit, AfterViewInit {

  @ViewChild("PlaceSrarchBar") placeSrarchBar: IonSearchbar;
  @ViewChild("filteWrapper") filteWrapperElement: ElementRef;
  @ViewChild("forYou") forYouElement: ElementRef;

  // map: Map;
  test: any;
  map: GoogleMap;
  latLng: ILatLng;
  // places: any[] = Places["default"];
  places: Place[] = [];
  tempPlacesCopy: Place[] = [];
  category: Category[] = [];

  markers: Marker[] = [];

  isFiltered: boolean = false;

  constructor(
    private platform: Platform,
    private renderer: Renderer2,
    private searchResultService: SearchResultService,
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
      if (res) {
        this.places = res;
        this.tempPlacesCopy = JSON.parse(JSON.stringify(this.places));
      }
    });

    this.storage.get("category").then(res => {
      if (res) { this.category = res; }
    });

  }

  ngAfterViewInit() {
    this.renderer.setStyle(this.filteWrapperElement.nativeElement, "top", (window.innerHeight / 2) - 195 + "px");
    this.renderer.setStyle(this.forYouElement.nativeElement, "top", (window.innerHeight / 2) - 195 + 200 + "px");
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
        this.searchResultService.hideModel();
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
        this.searchResultService.hideModel();
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

      this.markers.push(marker);
    });

  }

  onClear(e) {
    this.searchResultService.hideModel();
  }

  onFocus() {
    this.searchResultService.showModel(SearchResultComponent);
    setTimeout(() => {
      this.placeSrarchBar.setFocus();
    }, 100);
  }

  onChange(event: any): void {
    this.placeSrarchBar.setFocus();
    this.searchResultService.filteredPlace(event["detail"]["value"].toLowerCase());
  }

  filterPlaces(event: any, category: Category): void {
    const e = <MouseEvent>event;

    [].forEach.call(this.filteWrapperElement.nativeElement.children, child => {
      const c = <HTMLElement>child;
      this.renderer.removeStyle(c.firstChild, "background-color");
    });

    const dataVal = document.querySelector(".filter-wrapper").attributes.getNamedItem("data-filtered");
    if (dataVal) {

      if (document.querySelector(".filter-wrapper").attributes.getNamedItem("data-filtered").value !== category.category) {

        this.renderer.setStyle(e.target, "background-color", "#0070c6");
        this.renderer.setAttribute(this.filteWrapperElement.nativeElement, "data-filtered", category.category);

        const tempPlaces: Place[] = [];

        this.tempPlacesCopy.forEach(place => {
          let filteredPlace: Category[] = [];
          filteredPlace = place.category.filter(c => {
            return c.category_id === category.id;
          });

          if (filteredPlace.length > 0) {
            tempPlaces.push(place);
          }
        });
        this.places = [...tempPlaces];

      } else {

        this.places = [...this.tempPlacesCopy];
        document.querySelector(".filter-wrapper").attributes.removeNamedItem("data-filtered");
      }


    } else {

      this.renderer.setStyle(e.target, "background-color", "#0070c6");
      this.renderer.setAttribute(this.filteWrapperElement.nativeElement, "data-filtered", category.category);

      const tempPlaces: Place[] = [];

      this.tempPlacesCopy.forEach(place => {
        let filteredPlace: Category[] = [];
        filteredPlace = place.category.filter(c => {
          return c.category_id === category.id;
        });

        if (filteredPlace.length > 0) {
          tempPlaces.push(place);
        }
      });
      this.places = [...tempPlaces];

    }

    this.markers.forEach(m => m.setVisible(false));
    this.markLocations();

  }
}
