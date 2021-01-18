import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MoviesService } from 'src/app/services/movies.service';

@Component({
  selector: 'app-api-login',
  templateUrl: './api-login.component.html',
  styleUrls: ['./api-login.component.scss'],
})
export class ApiLoginComponent implements OnInit {
  public key: string;
  constructor(
    public movieService: MoviesService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  public apiTest() {
    this.movieService.apiTest(this.key).subscribe(
      (data) => this.sucess(),

      (err) =>
        this.toastr.error('Invalid Api key', 'Error', {
          positionClass: 'toast-bottom-right',
        })
    );
  }

  public sucess() {
    localStorage.setItem('apiKey', this.key);
    this.router.navigate(['/']);
    this.toastr.success('Api key generated', 'Sucess', {
      positionClass: 'toast-bottom-right,',
    });
    window.location.reload();
  }
}
