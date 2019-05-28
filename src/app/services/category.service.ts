import { Injectable, OnInit } from "@angular/core";
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse
} from "@angular/common/http";
import { Observable, interval, throwError, of } from "rxjs";
import { environment } from "src/environments/environment";
import { map, retryWhen, flatMap } from "rxjs/operators";
import { Category } from "../interfaces";
import { Storage } from "@ionic/storage";
import { AuthenticationService } from "./authentication.service";
import { ServerReturn } from "../interfaces/server-return.interface";

const endpoint = environment.apiEndpoint;

@Injectable({
  providedIn: "root"
})

export class CategoryService {
  token: string = "";

  constructor(private http: HttpClient, private storage: Storage, public auth: AuthenticationService) {
    this.token = this.auth.getToken;
  }

  get(): Observable<Category[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: this.token
      })
    };
    return this.http.get<ServerReturn>(endpoint + "category", httpOptions).pipe(
      map(data => {
        return data.data;
      })
    );
  }

  cacheCategory(token: string): void {
    this.storage.remove("category");

    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: token
      })
    };

    this.http.get<ServerReturn>(endpoint + "category", httpOptions)
      .pipe(retryWhen(_ => {
        return interval(5000).pipe(
          flatMap(count => count === 3 ? throwError("Giving up") : of(count))
        );
      })).subscribe(data => {
        this.storage.set("category", data.data);
      });

  }

}
