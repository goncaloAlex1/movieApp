import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MoviesService } from 'src/app/services/movies.service';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss'],
})
export class MovieDetailsComponent implements OnInit {
  public movie: any;
  public movieUrl: string = '';
  public loaded: boolean = false;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private movieService: MoviesService,
    private toastr: ToastrService,
    private loader: NgxSpinnerService
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.loader.show();

      this.movieService.getMovie(params.name).subscribe((data) => {
        if (data.Error) {
          this.toastr.error('Movie not Found', 'Error', {
            positionClass: 'toast-bottom-right',
          });
        } else {
          try {
            this.getMovieInfo(data.Search, params.name);
          } catch (error) {}
        }
      });
       this.loader.hide();
        this.loaded = true;
    });
  }

  public getMovieInfo(data: any, title: string) {
    try {
      var info = data.find(
        (x) => x.Title.toLowerCase() === title.toLowerCase()
      );
      this.movie = info;
      this.movieUrl = info.Title;
    } catch {
      this.toastr.error('Movie name needs to be specific', 'Error', {
        positionClass: 'toast-bottom-right',
      });
      this.movie = false;
    }
  }
  public changeMovie(title: string) {
    this.router.navigate(['/details/' + title]);
  }
  public goBack() {
    this.router.navigate(['/']);
  }
}
