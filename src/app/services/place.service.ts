import { Injectable, OnInit } from "@angular/core";
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse
} from "@angular/common/http";
import { Observable, interval, throwError, of } from "rxjs";
import { environment } from "src/environments/environment";
import { map, retryWhen, flatMap } from "rxjs/operators";
import { Place } from "../interfaces";
import { Storage } from "@ionic/storage";
import { AuthenticationService } from "./authentication.service";
import { ServerReturn } from "../interfaces/server-return.interface";

const endpoint = environment.apiEndpoint;

@Injectable({
  providedIn: "root"
})


export class PlaceService {
  token: string = "";

  constructor(private http: HttpClient, private storage: Storage, public auth: AuthenticationService) {
    this.token = this.auth.getToken;
  }

  ///////////////// check the place  interfae

  get(): Observable<Place[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: this.token
      })
    };
    return this.http.get<ServerReturn>(endpoint + "place", httpOptions).pipe(
      map(data => {
        return data.data;
      })
    );
  }

  async cachePlaces(token: string): Promise<void> {
    this.storage.remove("place");

    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: token
      })
    };

    await this.http.get<ServerReturn>(endpoint + "place", httpOptions)
      .pipe(retryWhen(_ => {
        return interval(5000).pipe(
          flatMap(count => count === 3 ? throwError("Giving up") : of(count))
        );
      })).subscribe(data => {
        this.storage.set("place", data.data);

        const arr: any[] = [];

        data.data.forEach(element => {

          arr.push({
            placeId: element.id,
            count: 0
          });

        });

        this.storage.set("visitCount", arr);
      });

  }
}
