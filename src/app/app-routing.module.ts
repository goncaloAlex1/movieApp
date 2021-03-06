import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home/home.component';
import { MovieDetailsComponent } from './movies/details/movie-details/movie-details.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'details/:name', component: MovieDetailsComponent },
  { path: '**', redirectTo: '/home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
