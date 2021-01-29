import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { MoviesService } from './services/movies.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  public status: boolean = false;
  public configs = { myparams: null, myStyle: null, width: null, height: null };
  constructor(public translate: TranslateService, public api: MoviesService) {
    api.currentKey.next(localStorage.getItem('apiKey'));
    api.currentUser.next(localStorage.getItem('username'));
    translate.addLangs(['en', 'pt']);
    translate.setDefaultLang('en');
    translate.use('en');
  }
}
