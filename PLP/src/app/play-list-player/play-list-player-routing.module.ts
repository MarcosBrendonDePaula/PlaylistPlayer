import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PlayListPlayerPage } from './play-list-player.page';

const routes: Routes = [
  {
    path: '',
    component: PlayListPlayerPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PlayListPlayerPageRoutingModule {}
