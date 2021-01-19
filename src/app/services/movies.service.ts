import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable, ReplaySubject, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  public apiKey: string;
  public selected = 'batman';
  public api = localStorage.getItem('apiKey');
  constructor(private http: HttpClient, private toastr: ToastrService) {}

  public getMovie(movie: string): Observable<any> {
    return this.http.get<any>(
      'http://www.omdbapi.com/?apikey=' + this.api + '&s=' + movie
    );
  }
  public getMovieWithType(movie: string, type: string): Observable<any> {
    return this.http.get<any>(
      'http://www.omdbapi.com/?apikey=' +
        this.api +
        '&s=' +
        movie +
        '&type=' +
        type
    );
  }
  public getMovieDetails(movie: string): Observable<any> {
    return this.http.get<any>(
      'http://www.omdbapi.com/?apikey=' +
        this.api +
        '&t=' +
        movie +
        '&plot=full'
    );
  }

  public apiTest(key: string): Observable<any> {
    return this.http.get<any>(
      'http://www.omdbapi.com/?apikey=' + key + '&s=batman'
    );
  }
}
