import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { MoviesService } from 'src/app/services/movies.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public movies = [];
  public loadingPage = 6;
  public cdr: ChangeDetectorRef;
  public movieUrl: string = 'batman';
  public searchBy = { movie: 'movie', series: 'series', episode: 'episode' };
  public type: string;
  constructor(
    public movieService: MoviesService,
    private loader: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.loader.show();
    this.movieService.getMovie(this.movieUrl).subscribe((data) => {
      this.movies = data.Search;
      this.loader.hide();
    });
  }

  public loadmore() {
    this.loadingPage += 8;
  }
  public addInput() {
    this.loader.show();
    if (this.type) {
      this.movieService
        .getMovieWithType(this.movieUrl, this.type)
        .subscribe((data) => {
          this.movies = data.Search;
          this.loadingPage = 6;
          this.loader.hide();
        });
    } else {
      this.movieService.getMovie(this.movieUrl).subscribe((data) => {
        this.movies = data.Search;
        this.loadingPage = 6;
        this.loader.hide();
      });
    }
  }
}
