import { Component } from '@angular/core';
import { RestService } from '../services/rest.service';
import { MenuController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { NotesModalPage } from '../modals/notes-modal/notes-modal.page';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  session;

  notesList = [];

  today : number = Date.now();

  constructor(
    private restService : RestService,
    private menu: MenuController,
    private modalController: ModalController,
  ) {
   this.restService.authUserData().then(result=>{
        this.session = result;
    });

    this.load_notes();
  }

 ngOnInit() {
  }

  close_sess(){
      this.restService.logout();
  }

  async load_notes(){
    var user = await this.restService.authUserData();
    this.restService.get_method(`task?user_id=${user['id_user']}`,'').subscribe(result =>{
      this.notesList = result.data;
    });
  }

  delete_note(task_id){
    this.restService.delete_method(`task/${task_id}`,'').subscribe(result =>{
      this.load_notes();
    });  
  }

  async new_note(){
    const modal = await this.modalController.create({
      component: NotesModalPage
    });
    modal.onDidDismiss().then(()=>{
        this.load_notes();
      });
    return await modal.present();
  }

  async update_note(id_note){
    const modal = await this.modalController.create({
      component: NotesModalPage,
      componentProps: {
        note: id_note
      }
    });
    modal.onDidDismiss().then(()=>{
        this.load_notes();
      });
    return await modal.present();
  }

}
