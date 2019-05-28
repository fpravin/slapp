import { Injectable } from "@angular/core";
import { HttpHeaders, HttpClient } from "@angular/common/http";
import { ServerReturn } from "../interfaces/server-return.interface";
import { retryWhen, flatMap, map } from "rxjs/operators";
import { interval, throwError, of, Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Storage } from "@ionic/storage";

const endpoint = environment.apiEndpoint;

@Injectable({
  providedIn: "root"
})
export class FavouriteService {

  constructor(private http: HttpClient, private storage: Storage) { }

  cacheFavourite(token: string, userID: string): void {
    this.storage.remove("favourite");

    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: token
      })
    };

    this.http.get<ServerReturn>(endpoint + "favourite?userID=" + userID, httpOptions)
      .pipe(retryWhen(_ => {
        return interval(5000).pipe(
          flatMap(count => count === 3 ? throwError("Giving up") : of(count))
        );
      })).subscribe(data => {
        this.storage.set("favourite", data.data);
      });

  }

  toggleFavourite(data: any, token: string): Observable<ServerReturn> {
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: token
      })
    };

    return this.http.patch<ServerReturn>(endpoint + "favourite/toggle", data, httpOptions).pipe(
      map(data => {
        return data;
      })
    );

    // this.http.patch(endpoint + "favourite/toggle", data, httpOptions).subscribe(d => {
    //   console.log(d);
    // });
  }
}
