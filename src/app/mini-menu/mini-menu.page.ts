import { Component, OnInit } from '@angular/core';
import { RestService } from '../services/rest.service';
import {PopoverController} from '@ionic/angular';

@Component({
  selector: 'app-mini-menu',
  templateUrl: './mini-menu.page.html',
  styleUrls: ['./mini-menu.page.scss'],
})
export class MiniMenuPage implements OnInit {

  constructor(
    private restService : RestService,
    private popover:PopoverController,
  ) { }

  ngOnInit() {
  }

  close_sess(){
    this.restService.logout();
    this.popover.dismiss();
  }

}
