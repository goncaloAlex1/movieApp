import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { MoviesService } from 'src/app/services/movies.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public movies = [];
  public loadingPage = 9;
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

  ngOnInit(): void {
    this.loader.show();
    this.movieService.getMovie(this.movieUrl, this.page).subscribe((data) => {
      this.movies = data.Search;
    });
    this.loader.hide();
  }

  public loadmore() {
    console.log(this.movies);
    this.loadingPage += 9;
    this.page++;
    if (this.type) {
      this.movieService
        .getMovieWithType(this.movieUrl, this.type, this.page)
        .subscribe((data) => {
          for (var i = 0; i < data.Search.length; i++) {
            this.movies.push(data.Search[i]);
          }
          this.loader.hide();
          this.movieService.selected = this.movieUrl;
        });
    } else {
      this.movieService.getMovie(this.movieUrl, this.page).subscribe((data) => {
        console.log(this.movies);
        this.loader.hide();
        for (var i = 0; i < data.Search.length; i++) {
          this.movies.push(data.Search[i]);
        }
        this.movieService.selected = this.movieUrl;
      });
    }
  }
  public addInput() {
    this.page = 1;
    this.loader.show();
    if (this.type) {
      this.movieService
        .getMovieWithType(this.movieUrl, this.type, this.page)
        .subscribe((data) => {
          this.movies = data.Search;
          this.loadingPage = 9;
          this.loader.hide();
          this.movieService.selected = this.movieUrl;
        });
    } else {
      this.movieService.getMovie(this.movieUrl, this.page).subscribe((data) => {
        this.movies = data.Search;
        this.loadingPage = 9;
        this.loader.hide();
        this.movieService.selected = this.movieUrl;
      });
    }
  }
}
