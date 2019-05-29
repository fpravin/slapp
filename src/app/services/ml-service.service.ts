import { Injectable } from "@angular/core";
import { Storage } from "@ionic/storage";

import * as brain from "brain.js";
import { Place } from "../interfaces";


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

  }

  async runMl(): Promise<Place[]> {

    const net = new brain.NeuralNetwork();

    net.train(
      [
        { input: [30, true, true], output: [1] },
        { input: [30, false, false], output: [0.3] },
        { input: [30, true, false], output: [0.8] },
        { input: [30, false, true], output: [0.8] },

        { input: [20, true, true], output: [0.8] },
        { input: [20, false, false], output: [0.2] },
        { input: [20, true, false], output: [0.6] },
        { input: [20, false, true], output: [0.6] },

        { input: [10, true, true], output: [0.6] },
        { input: [10, false, false], output: [0] },
        { input: [10, true, false], output: [0.3] },
        { input: [10, false, true], output: [0.3] },
      ]
    );

    let timeData: TimeMl[];
    let countData: CountML[];
    let favData: Favourite[];
    let total: number = 0;
    let avg: number = 0;

    const recommendationArray: Place[] = [];

    this.storage.get("favourite").then(fav => { favData = fav; });

    this.storage.get("timeCount").then(time => { timeData = time; });

    this.storage.get("visitCount").then(visit => { countData = visit; });

    await this.storage.get("place").then(p => {

      const place = p as Place[];

      place.forEach(p => {

        const findTime = timeData.find(t => {
          // never gets undefined
          return t.placeId === +p.id;
        });

        const findCount = countData.find(c => {
          // never gets undefined
          return c.placeId === +p.id;
        });

        const findFav = favData.find(f => {
          // might get undefined
          return f.place_id === +p.id;
        });

        const input: any[] = [];

        input[0] = findTime.time;
        input[1] = (findCount.count >= 3) ? true : false;
        input[2] = (findFav) ? true : false;

        for (let index = 0; index < 3; index++) {
          const output = net.run(input);
          total = total + output[0];
        }
        avg = total / 3;

        console.log(avg);
        if (avg > 0.75) {
          recommendationArray.push(p);
        }

        total = 0;
        avg = 0;



      });

    });

    return recommendationArray;
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

interface Favourite {
  id: number;
  user_id: number;
  place_id: number;
  deleted_at: string;
  created_at: string;
  updated_at: string;
}
