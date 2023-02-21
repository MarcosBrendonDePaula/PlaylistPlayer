import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private navCtrl: NavController) {}
  navigateToMusicas() {
    this.navCtrl.navigateForward('/music-download');
  }
  navigateToPlayLists(){
    this.navCtrl.navigateForward('/play-list-download');
  }
}
