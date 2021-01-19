import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { MoviesService } from 'src/app/services/movies.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  public show: boolean = false;
  constructor(public translate: TranslateService, public api: MoviesService) {}

  ngOnInit(): void {}

  public logout() {
    localStorage.removeItem('apiKey');
  }
}
