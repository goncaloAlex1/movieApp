import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subscription } from 'rxjs';
import { MoviesService } from 'src/app/services/movies.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public movies = [];
  public loadingPage = 12;
  public cdr: ChangeDetectorRef;
  public movieUrl;
  public searchBy = { movie: 'Movies', series: 'Series', episode: 'Episodes' };
  public type: string;
  public page: number = 1;
  constructor(
    public movieService: MoviesService,
    private loader: NgxSpinnerService
  ) {
    this.movieUrl = this.movieService.selected;
  }

  async ngOnInit() {
    this.loader.show();
    await this.initPage();
    console.log(this.movies);
    this.loader.hide();
  }
  public async initPage() {
    await this.movieService
      .getMovie(this.movieUrl, this.page)
      .toPromise()
      .then((data) => {
        for (var i = 0; i < data.Search.length; i++) {
          this.movies.push(data.Search[i]);
        }
      });
    this.page++;
    this.movieService
      .getMovie(this.movieUrl, this.page)
      .toPromise()
      .then((data) => {
        for (var i = 0; i < data.Search.length; i++) {
          this.movies.push(data.Search[i]);
        }
      });
  }
  public loadmore() {
    console.log(this.movies);
    this.loadingPage += 12;
    this.page++;
    if (this.type) {
      this.loadMoreRequestType();
    } else {
      this.loadmoreRequest();
    }
    this.page++;
  }

  public async loadmoreRequest() {
    await this.movieService
      .getMovie(this.movieUrl, this.page)
      .toPromise()
      .then((data) => {
        this.loader.hide();
        for (var i = 0; i < data.Search.length; i++) {
          this.movies.push(data.Search[i]);
        }
        this.movieService.selected = this.movieUrl;
        this.page++;
      });
    this.movieService
      .getMovie(this.movieUrl, this.page)
      .toPromise()
      .then((data) => {
        console.log(this.movies);
        this.loader.hide();
        for (var i = 0; i < data.Search.length; i++) {
          this.movies.push(data.Search[i]);
        }
        this.movieService.selected = this.movieUrl;
      });
  }

  public async loadMoreRequestType() {
    await this.movieService
      .getMovieWithType(this.movieUrl, this.type, this.page)
      .toPromise()
      .then((data) => {
        for (var i = 0; i < data.Search.length; i++) {
          this.movies.push(data.Search[i]);
        }
        this.loader.hide();
        this.movieService.selected = this.movieUrl;
        this.page++;
      });
    this.movieService
      .getMovieWithType(this.movieUrl, this.type, this.page)
      .toPromise()
      .then((data) => {
        for (var i = 0; i < data.Search.length; i++) {
          this.movies.push(data.Search[i]);
        }
        this.loader.hide();
        this.movieService.selected = this.movieUrl;
      });
  }
  public addInput() {
    this.page = 1;
    this.movies = [];
    this.loader.show();
    if (this.type) {
      this.loadMoreRequestType();
      this.loadingPage = 12;
    } else {
      this.loadmoreRequest();
      this.loadingPage = 12;
    }
  }
}
