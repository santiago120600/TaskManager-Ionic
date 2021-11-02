import { Component } from '@angular/core';
import { RestService } from '../services/rest.service';
import { MenuController, ModalController, PopoverController } from '@ionic/angular';
import { NotesModalPage } from '../modals/notes-modal/notes-modal.page';
import { MiniMenuPage } from  '../mini-menu/mini-menu.page';
import { ActivatedRoute } from '@angular/router';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';

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

  async new_note(){
    const modal = await this.modalController.create({
      component: NotesModalPage,
      componentProps:{
        id_project: this.route.snapshot.paramMap.get('id_project')
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
        id_project: this.route.snapshot.paramMap.get('id_project'),
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
    task['completed'] = (task['completed'] == true ? false : true);
    this.restService.put_method(`task/${task['id_task']}`,task).subscribe(result =>{
      this.load_notes();
    });  
  }

}
