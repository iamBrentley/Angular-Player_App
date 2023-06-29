import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlayerDetailsComponent } from './player-details/player-details.component';
import { ViewDetailsComponent } from './view-details/view-details.component';
import { EditDetailsComponent } from './edit-details/edit-details.component';
import { DetailedViewComponent } from './detailed-view/detailed-view.component';

const routes: Routes = [
  {path: '', redirectTo: 'playerdetails', pathMatch: 'full'},
  {path: 'playerdetails', component: PlayerDetailsComponent},
  {path: 'viewdetails', component: ViewDetailsComponent},
  {path: 'editdetails', component: EditDetailsComponent},
  {path: 'details/:id', component: DetailedViewComponent},
  {path: 'update/:id', component: PlayerDetailsComponent}



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
