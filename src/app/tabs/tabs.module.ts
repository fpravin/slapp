import { IonicModule } from "@ionic/angular";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { TabsPageRoutingModule } from "./tabs.router.module";

import { TabsPage } from "./tabs.page";
import { DashboardPageModule } from "../members/dashboard/dashboard.module";
import { PlaceDetailPageModule } from "../core/place-detail/place-detail.module";


@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    TabsPageRoutingModule,
    DashboardPageModule,
    PlaceDetailPageModule,
  ],
  declarations: [TabsPage],
  providers: []
})
export class TabsPageModule { }
