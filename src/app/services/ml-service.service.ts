import { Injectable } from "@angular/core";
import { Storage } from "@ionic/storage";

@Injectable({
  providedIn: "root"
})

export class MlServiceService {

  constructor(private storage: Storage) { }

  public setvisitCount(placeId: number): void {



    this.storage.get("visitCount").then(count => {

      const placeCount = (count as PlaceMl[]);

      const foundIndex = placeCount.findIndex(place => {
        return place.placeId === placeId;
      });

      if (foundIndex !== -1) {
        const newCount: PlaceMl = {
          count: placeCount[foundIndex].count + 1,
          placeId: placeId
        };

        placeCount.splice(foundIndex, 1, newCount);

        this.storage.set("visitCount", placeCount);
      }

    });

  }
}

interface PlaceMl {
  count: number;
  placeId: number;
}
