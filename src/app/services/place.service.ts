import { Injectable, OnInit } from "@angular/core";
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse
} from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { map } from "rxjs/operators";
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
        this.cachePlaces(data.data);
        return data.data;
      })
    );
  }

  cachePlaces(data: Place): void {
    this.storage.remove("place");
    this.storage.set("place", data);
  }
}
