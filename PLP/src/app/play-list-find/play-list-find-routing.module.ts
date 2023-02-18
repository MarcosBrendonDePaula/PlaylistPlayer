import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PlayListFindPage } from './play-list-find.page';

const routes: Routes = [
  {
    path: '',
    component: PlayListFindPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PlayListFindPageRoutingModule {}
