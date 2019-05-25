import { Injectable, OnInit } from "@angular/core";
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse
} from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { map } from "rxjs/operators";
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
        this.cachePlaces(data.data);
        return data.data;
      })
    );
  }

  cachePlaces(data: Category): void {
    this.storage.remove("category");
    this.storage.set("category", data);
  }

}
