import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PlayListDownloadPage } from './play-list-download.page';

const routes: Routes = [
  {
    path: '',
    component: PlayListDownloadPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PlayListDownloadPageRoutingModule {}
