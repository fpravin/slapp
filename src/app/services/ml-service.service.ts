import { Injectable } from "@angular/core";
import { Storage } from "@ionic/storage";

@Injectable({
  providedIn: "root"
})

export class MlServiceService {

  constructor(private storage: Storage) { }

  public setVisitCount(placeId: number): void {
    this.storage.get("visitCount").then(count => {

      const placeCount = (count as CountML[]);

      const foundIndex = placeCount.findIndex(place => {
        return place.placeId === placeId;
      });

      if (foundIndex !== -1) {

        const newCount: CountML = {
          count: placeCount[foundIndex].count + 1,
          placeId: placeId
        };

        placeCount.splice(foundIndex, 1, newCount);

        this.storage.set("visitCount", placeCount);
      }

    });
  }

  public setTime(dateTo: Date, dateFrom: Date, placeId: number): void {

    this.storage.get("timeCount").then(count => {

      const placeTime = (count as TimeMl[]);

      const foundIndex = placeTime.findIndex(place => {
        return place.placeId === placeId;
      });

      if (foundIndex !== -1) {

        const diff = (dateTo.getTime() - dateFrom.getTime()) / 1000;

        const newCount: TimeMl = {
          time: placeTime[foundIndex].time + Math.abs(diff),
          placeId: placeId
        };

        placeTime.splice(foundIndex, 1, newCount);

        this.storage.set("timeCount", placeTime);
      }

    });


    // console.log(Math.abs(diff));
  }

  

}

interface CountML {
  count: number;
  placeId: number;
}

interface TimeMl {
  time: number;
  placeId: number;
}
