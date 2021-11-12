import { Component } from '@angular/core';
import { RestService } from '../services/rest.service';
import { ModalController, PopoverController } from '@ionic/angular';
import { NotesModalPage } from '../modals/notes-modal/notes-modal.page';
import { MiniMenuPage } from  '../mini-menu/mini-menu.page';
import { ActivatedRoute } from '@angular/router';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { UsersProjectModalPage } from '../modals/users-project-modal/users-project-modal.page';
import { AsssignUserModalPage } from '../modals/asssign-user-modal/asssign-user-modal.page';
import { ComentariosNotaModalPage } from '../modals/comentarios-nota-modal/comentarios-nota-modal.page';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  session;

  today : number = Date.now();

  todo = [];

  done = [];
  project; // esta variable la quiero usar para traer el nombre del proyecto
  id_project = this.route.snapshot.paramMap.get('id_project');

  constructor(
    private restService : RestService,
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
    this.restService.get_method(`task?project_id=${this.id_project}`,'').subscribe(result =>{
      this.todo = result.data.filter(item =>{
        if(item.completed == false){
          return true;
        }else{
          return false;
        }
      });
      this.done = result.data.filter(item =>{
        if(item.completed == false){
          return false;
        }else{
          return true;
        }
      });
    });
  }

  delete_note(task_id){
    this.restService.delete_method(`task/${task_id}`,'').subscribe(result =>{
      this.load_notes();
    });  
  }

  async manage_comments(task){
    const modal = await this.modalController.create({
      component: ComentariosNotaModalPage,
      componentProps:{
        'id_task': task.id_task,
      },
    });
    return await modal.present();
  }

  async assign_user(task){
    const modal = await this.modalController.create({
      component: AsssignUserModalPage,
      componentProps:{
       task: task
      }
    });
    return await modal.present();
  }

  async manage_users(){
    const modal = await this.modalController.create({
      component: UsersProjectModalPage,
      componentProps:{
        id_project: this.id_project,
      }
    });
    return await modal.present();
  }

  async new_note(){
    const modal = await this.modalController.create({
      component: NotesModalPage,
      componentProps:{
        id_project: this.id_project
      }
    });
    modal.onDidDismiss().then(()=>{
        this.load_notes();
      });
    return await modal.present();
  }

  async new_note_completed(){
    const modal = await this.modalController.create({
      component: NotesModalPage,
      componentProps:{
        id_project: this.id_project,
        completed: true
      }
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


  drop(event: CdkDragDrop<string[]>) {
    var task = event.previousContainer.data[event.previousIndex];
    if (event.previousContainer === event.container) {
      return;
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
      this.changeCompleted(task);
    }
  }

  changeCompleted(task){
    var data = {
      "desc_task":task.desc_task,
      "project":task.project
    }
    data['completed'] = (task['completed'] == true ? false : true);
    this.restService.put_method(`task/${task['id_task']}`,data).subscribe(result =>{
      this.load_notes();
    });  
  }

}
