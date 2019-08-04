import { Injectable } from "@angular/core";
import { Storage } from "@ionic/storage";

import * as brain from "brain.js";
import { Place } from "../interfaces";

import { LinearRegression } from "machinelearn/linear_model";
import { KNeighborsClassifier } from "machinelearn/neighbors";
import { GaussianNB } from "machinelearn/naive_bayes";


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


    const knn = new KNeighborsClassifier();
    const X = [
      [30, true, true],
      [30, false, false],
      [30, true, false],
      [30, false, true],

      [20, true, true],
      [20, false, false],
      [20, true, false],
      [20, false, true],

      [10, true, true],
      [10, false, false],
      [10, true, false],
      [10, false, true]
    ];
    const y = [
      1,
      0.3,
      0.8,
      0.8,
      0.8,
      0.2,
      0.6,
      0.6,
      0.6,
      0,
      0.3,
      0.3
    ];

    // working
    const net = new brain.NeuralNetwork();
    net.train(
      [
        { input: [30, true, true], output: [1.5] },
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

        const NNOutput: number = net.run(input);

        if (NNOutput > 0.6) {

          knn.fit(X, y);
          const KNNOutput: number = knn.predict(input);

          if (Math.abs(NNOutput - KNNOutput) < 0.3) {
            recommendationArray.push(p);
          } else {

          }
        } else {

        }


      });

    });

    this.storage.get("visitCount").then(visit => {
      console.log("Visit count");
      console.log(visit);
    });

    this.storage.get("timeCount").then(count => {
      console.log("Time");
      console.log(count);
    });

    this.storage.get("favourite").then(fav => {
      console.log("Favourite Place");
      console.log(fav);
    });

    console.log("Recommened Places");
    console.log(recommendationArray);
    
    return recommendationArray;
  }

}

interface CountML {
  placeId: number;
  count: number;
}

interface TimeMl {
  placeId: number;
  time: number;
}

interface Favourite {
  id: number;
  user_id: number;
  place_id: number;
  deleted_at: string;
  created_at: string;
  updated_at: string;
}
