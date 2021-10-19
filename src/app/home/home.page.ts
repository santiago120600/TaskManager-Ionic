import { Component } from '@angular/core';
import { RestService } from '../services/rest.service';
import { MenuController, ModalController, PopoverController } from '@ionic/angular';
import { NotesModalPage } from '../modals/notes-modal/notes-modal.page';
import { MiniMenuPage } from  '../mini-menu/mini-menu.page';
import { ActivatedRoute } from '@angular/router';

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
    private popoverController: PopoverController,
    private route : ActivatedRoute,
  ) {
   this.restService.authUserData().then(result=>{
        this.session = result;
    });

    this.load_notes();
  }

 ngOnInit() {
  }

  async load_notes(){
    var id_project = this.route.snapshot.paramMap.get('id_project');
    this.restService.get_method(`task?project_id=${id_project}`,'').subscribe(result =>{
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

  async update_note(note){
    const modal = await this.modalController.create({
      component: NotesModalPage,
      componentProps: {
        note: note
      }
    });
    modal.onDidDismiss().then(()=>{
        this.load_notes();
      });
    return await modal.present();
  }

  async presentPopover(ev: any) {
    const popover = await this.popoverController.create({
      component: MiniMenuPage,
      event: ev,
      translucent: true,
    });
    await popover.present();
  }

}
