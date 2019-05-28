import { Injectable } from "@angular/core";
import {
  UserInterface,
  LoginReturnInterface,
  LoginDataInterface
} from "./../interfaces";
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse
} from "@angular/common/http";
import { Observable, of, interval, throwError } from "rxjs";
import { map, catchError, tap, retryWhen, flatMap } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { Storage } from "@ionic/storage";

const endpoint = environment.apiEndpoint;
const httpOptions = {
  headers: new HttpHeaders({
    "Content-Type": "application/json",
    "X-Requested-With": "XMLHttpRequest"
  })
};

@Injectable({
  providedIn: "root"
})
export class UserService {
  constructor(private http: HttpClient, private storage: Storage) { }

  login(user: LoginDataInterface): Observable<any> {
    // return this.http.post<any>(endpoint + "login", user, httpOptions).pipe(
    //   tap(_user => {
    //     const user: LoginReturnInterface = _user;
    //     return user;
    //   }),
    //   catchError(this.handleError<any>("addProduct"))
    // );

    return this.http.post<any>(endpoint + "login", user, httpOptions).pipe(
      map(user => {
        // login successful if there's a jwt token in the response
        // if (user && user.access_token) {
        //   // store user details and jwt token in local storage to keep user logged in between page refreshes
        //   localStorage.setItem("currentUser", JSON.stringify(user));
        // }

        return user;
      })
    );
  }

  getUser(token: string): Observable<UserInterface> {
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: token
      })
    };
    return this.http.get<UserInterface>(endpoint + "user", httpOptions).pipe(
      map(data => {
        return data;
      })
    );
  }

  cacheUser(token: string): void {
    this.storage.remove("user");

    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: token
      })
    };

    this.http.get<UserInterface>(endpoint + "user", httpOptions)
      .pipe(retryWhen(_ => {
        return interval(5000).pipe(
          flatMap(count => count === 3 ? throwError("Giving up") : of(count))
        );
      })).subscribe(data => {
        this.storage.set("user", data);
      });
  }

  private handleError<T>(operation = "operation", result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      // console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      // console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  private extractData(res: Response) {
    const body = res;
    return body || {};
  }
}
