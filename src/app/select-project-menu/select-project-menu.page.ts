import { Component, OnInit } from '@angular/core';
import { RestService } from '../services/rest.service';
import { Router } from '@angular/router';
import { PopoverController } from '@ionic/angular';
import { MiniMenuPage } from  '../mini-menu/mini-menu.page';

@Component({
  selector: 'app-select-project-menu',
  templateUrl: './select-project-menu.page.html',
  styleUrls: ['./select-project-menu.page.scss'],
})
export class SelectProjectMenuPage implements OnInit {

  projects = [];

  constructor(
    private restService : RestService,
    private router : Router,
    private popoverController: PopoverController,
  ) {
    this.load_projects();
  }


  ngOnInit() {
  }

  async presentPopover(ev: any) {
    const popover = await this.popoverController.create({
      component: MiniMenuPage,
      event: ev,
      translucent: true,
    });
    await popover.present();
  }

  async load_projects(){
    var user = await this.restService.authUserData();
    this.restService.get_method(`project?user_id=${user['id_user']}`,'').subscribe(result =>{
      this.projects = result.data;
    });
  }

  goToPanel(id_project){
   this.router.navigate(['/home',{id_project:id_project}]);
  }

}
