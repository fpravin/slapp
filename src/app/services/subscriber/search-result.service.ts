import { ModalController } from "@ionic/angular";
import { Injectable, Output, EventEmitter, OnInit } from "@angular/core";
import { Subject, BehaviorSubject } from "rxjs";
import { Place } from "src/app/interfaces";

@Injectable({
  providedIn: "root"
})

export class SearchResultService {

  // @Output() toggleChange: EventEmitter<boolean> = new EventEmitter();
  @Output() filterPlace: EventEmitter<string> = new EventEmitter();
  public isOpen = new BehaviorSubject<boolean>(false);
  modal: any;

  constructor(private modalController: ModalController) { }

  // toggleAssistantPanel(value: boolean): void {
  //   this.toggleChange.emit(value);
  // }

  async showModel(component, data?: Place[]) {
    if (!this.isOpen.value) {
      this.modal = await this.modalController.create({
        component: component,
        componentProps: { value: data },
        showBackdrop: true,
        cssClass: "search-result-model"
      });
      this.isOpen.next(true);
      return await this.modal.present();
    }
  }

  hideModel() {
    if (this.isOpen.value) {
      this.isOpen.next(false);
      this.modalController.dismiss();
    }
  }

  filteredPlace(data: string): void {
    this.filterPlace.emit(data);
  }
}
