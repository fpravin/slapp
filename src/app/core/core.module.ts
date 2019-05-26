import { LocationDetailService, SearchResultService } from "../services/subscriber";
import { LocationDetailComponent } from "./location-detail/location-detail.component";
import { PlaceDetailPageModule } from "./place-detail/place-detail.module";
import { SearchResultComponent } from "./search-result/search-result.component";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { IonicModule } from "@ionic/angular";

@NgModule({
  declarations: [SearchResultComponent, LocationDetailComponent],
  imports: [CommonModule, IonicModule, PlaceDetailPageModule],
  exports: [
    SearchResultComponent,
    LocationDetailComponent,
    PlaceDetailPageModule
  ],
  entryComponents: [SearchResultComponent, LocationDetailComponent],
  providers: [SearchResultService, LocationDetailService]
})
export class CoreModule { }
