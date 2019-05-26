import { ModalController } from "@ionic/angular";
import { Injectable, Output, EventEmitter, OnInit } from "@angular/core";
import { Subject, BehaviorSubject } from "rxjs";
// import { LocationDetailComponent } from "src/app/core/location-detail/location-detail.component";

@Injectable({
  providedIn: "root"
})
export class LocationDetailService implements OnInit {
  public isOpen = new BehaviorSubject<boolean>(false);
  locationDetailModel: any;

  constructor(private modalController: ModalController) { }

  ngOnInit() {
  }

  async showModel(component, id) {
    if (!this.isOpen.value) {
      this.isOpen.next(true);
      this.locationDetailModel = await this.modalController.create({
        component: component,
        componentProps: { id: id },
        showBackdrop: true,
        backdropDismiss: true,
        cssClass: "location-detail-model"
      });

      return await this.locationDetailModel.present();
    }
  }

  hideModel() {
    // if (this.isOpen.value) {
    this.isOpen.next(false);
    this.modalController.dismiss();
    // }
  }
}
