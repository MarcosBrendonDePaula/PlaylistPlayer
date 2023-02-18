import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MusicDownloadPage } from './music-download.page';

const routes: Routes = [
  {
    path: '',
    component: MusicDownloadPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MusicDownloadPageRoutingModule {}
