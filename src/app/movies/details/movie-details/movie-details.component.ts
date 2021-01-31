import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MoviesService } from 'src/app/services/movies.service';
import { ToastrService } from 'ngx-toastr';
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
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.movieService.getMovieDetails(params.name).subscribe((data) => {
        if (data.Error) {
          this.toastr.error('Movie not Found', 'Error', {
            positionClass: 'toast-bottom-right',
          });
          this.movie = false;
        } else {
          try {
            this.getMovieInfo(data);
          } catch (error) {}
        }
      });
    });
  }

  public getMovieInfo(data: any) {
    this.movie = data;
    this.movieUrl = data.Title;
    this.loaded = true;
  }
  public changeMovie(title: string) {
    this.movieService.getMovieDetailsbyName(title).subscribe((data) => {
      if (data.Error) {
        this.toastr.error('Movie not Found', 'Error', {
          positionClass: 'toast-bottom-right',
        });
        this.movie = false;
      } else {
        try {
          this.getMovieInfo(data);
        } catch (error) {}
      }
    });
  }
  public goBack() {
    this.router.navigate(['/']);
  }
}
