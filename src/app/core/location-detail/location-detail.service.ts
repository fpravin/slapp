import { LocationDetailComponent } from "./location-detail.component";
import { ModalController } from "@ionic/angular";
import { Injectable, Output, EventEmitter, OnInit } from "@angular/core";
import { Subject, BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class LocationDetailService implements OnInit {
  public isOpen = new BehaviorSubject<boolean>(false);
  locationDetailModel: any;

  constructor(private modalController: ModalController) { }

  ngOnInit() {
  }

  async showModel(id) {
    // if (!this.isOpen.value) {
    this.isOpen.next(true);
    this.locationDetailModel = await this.modalController.create({
      component: LocationDetailComponent,
      componentProps: { id: id },
      showBackdrop: true,
      backdropDismiss: true,
      cssClass: "location-detail-model"
    });

    return await this.locationDetailModel.present();
    // }
  }

  hideModel() {
    // if (this.isOpen.value) {
    this.isOpen.next(false);
    this.modalController.dismiss();
    // }
  }
}
