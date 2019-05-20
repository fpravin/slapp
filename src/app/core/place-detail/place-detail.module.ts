import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { Routes, RouterModule } from "@angular/router";

import { IonicModule } from "@ionic/angular";

import { PlaceDetailPage } from "./place-detail.page";
import { TabsComponent } from "./tabs/tabs.component";
import { TabComponent } from "./tab/tab.component";

const routes: Routes = [
  {
    path: "place-detail/:id",
    component: PlaceDetailPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [PlaceDetailPage, TabsComponent, TabComponent]
})
export class PlaceDetailPageModule {}
