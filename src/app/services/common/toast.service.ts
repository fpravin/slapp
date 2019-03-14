import { Injectable } from "@angular/core";
import { ToastController } from "@ionic/angular";
import { Theme } from "src/app/enum/theme.enum";

@Injectable({
  providedIn: "root"
})
export class ToastService {
  constructor(private toastController: ToastController) {}

  async showToast(message: string, color: Theme, duration: number = 2000) {
    const toast = await this.toastController.create({
      message: message,
      duration: duration,
      color: color
    });
    toast.present();
  }
}
