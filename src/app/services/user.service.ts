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
import { Observable, of } from "rxjs";
import { map, catchError, tap } from "rxjs/operators";

const endpoint = "http://127.0.0.1:8080/api/auth/";
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
  constructor(private http: HttpClient) {}

  login(user: LoginDataInterface): Observable<any> {
    // return this.http.post<any>(endpoint + "login", user, httpOptions).pipe(
    //   tap(_user => {
    //     const user: LoginReturnInterface = _user;
    //     return user;
    //   }),
    //   catchError(this.handleError<any>("addProduct"))
    // );
    const s = JSON.stringify({
      title: "foo",
      body: "bar",
      userId: 1
    });
    // return this.http
    //   .post<any>("https://jsonplaceholder.typicode.com/posts", s, httpOptions)
    //   .pipe(
    //     map(user => {
    //       // login successful if there's a jwt token in the response
    //       // if (user && user.access_token) {
    //       //   // store user details and jwt token in local storage to keep user logged in between page refreshes
    //       //   localStorage.setItem("currentUser", JSON.stringify(user));
    //       // }

    //       return user;
    //     })
    //   );
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

  getUser(token): Observable<UserInterface> {
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
