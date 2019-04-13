import { Component } from "@angular/core";
import { Platform } from "@ionic/angular";
import { Map, latLng, tileLayer, Layer, marker } from "leaflet";
import leaflet from "leaflet";

@Component({
  selector: "app-tab2",
  templateUrl: "tab2.page.html",
  styleUrls: ["tab2.page.scss"]
})
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
  }
}
