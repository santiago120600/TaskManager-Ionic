import { Component, OnInit } from '@angular/core';
import { RestService } from '../services/rest.service';
import { Router } from '@angular/router';
import { PopoverController, LoadingController } from '@ionic/angular';
import { MiniMenuPage } from  '../mini-menu/mini-menu.page';
import { ModalController } from '@ionic/angular';
import { ProjectsModalPage } from '../modals/projects-modal/projects-modal.page';

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
    private modalController: ModalController,
    private loadingController : LoadingController,
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
    const loading = await this.loadingController.create({
      message: 'Espere...'
    });
    await loading.present();
    var user = await this.restService.authUserData();
    this.restService.get_method(`project?user_id=${user['id_user']}`,'').subscribe(result =>{
      this.projects = result.data;
    });
    loading.dismiss();
  }

  goToPanel(id_project){
   this.router.navigate(['/home',{id_project:id_project}]);
  }

  async new_project(){
    const modal = await this.modalController.create({
      component: ProjectsModalPage
    });
    modal.onDidDismiss().then(()=>{
        this.load_projects();
      });
    return await modal.present();
  }

  async update_project(project){
    const modal = await this.modalController.create({
      component: ProjectsModalPage,
      componentProps: {
        project: project
      }
    });
    modal.onDidDismiss().then(()=>{
        this.load_projects();
      });
    return await modal.present();
  }

}
