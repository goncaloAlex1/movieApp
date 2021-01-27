import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable, ReplaySubject, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  public selected = 'batman';
  public currentKey = new ReplaySubject(1);
  public currApiKey$ = this.currentKey.asObservable();
  public api = localStorage.getItem('apiKey');
  constructor(private http: HttpClient, private toastr: ToastrService) {}

  public getMovie(movie: string, page: number): Observable<any> {
    console.log(this.currApiKey$);
    return this.http.get<any>(
      'https://www.omdbapi.com/?apikey=' +
        localStorage.getItem('apiKey') +
        '&s=' +
        movie +
        '&page=' +
        page
    );
  }
  public getMovieWithType(
    movie: string,
    type: string,
    page: number
  ): Observable<any> {
    return this.http.get<any>(
      'https://www.omdbapi.com/?apikey=' +
        localStorage.getItem('apiKey') +
        '&s=' +
        movie +
        '&type=' +
        type +
        '&page=' +
        page
    );
  }
  public getMovieDetails(movie: string): Observable<any> {
    return this.http.get<any>(
      'https://www.omdbapi.com/?apikey=' +
        localStorage.getItem('apiKey') +
        '&i=' +
        movie +
        '&plot=full'
    );
  }
  public getMovieDetailsbyName(movie: string): Observable<any> {
    return this.http.get<any>(
      'https://www.omdbapi.com/?apikey=' +
        localStorage.getItem('apiKey') +
        '&t=' +
        movie +
        '&plot=full'
    );
  }

  public apiTest(key: string): Observable<any> {
    return this.http
      .get<any>('http://www.omdbapi.com/?apikey=' + key + '&s=batman')
      .pipe(
        map((response) => {
          const result = response;
          if (result) {
            localStorage.setItem('apiKey', key);
            this.currentKey.next(key);
          }
        })
      );
  }
  public logout() {
    this.currentKey.next(null);
  }
}
