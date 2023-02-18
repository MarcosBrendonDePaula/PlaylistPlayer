import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'play-list-find',
    loadChildren: () => import('./play-list-find/play-list-find.module').then( m => m.PlayListFindPageModule)
  },
  {
    path: 'play-list-download',
    loadChildren: () => import('./play-list-download/play-list-download.module').then( m => m.PlayListDownloadPageModule)
  },
  {
    path: 'play-list-player',
    loadChildren: () => import('./play-list-player/play-list-player.module').then( m => m.PlayListPlayerPageModule)
  },
  {
    path: 'music-download',
    loadChildren: () => import('./music-download/music-download.module').then( m => m.MusicDownloadPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
