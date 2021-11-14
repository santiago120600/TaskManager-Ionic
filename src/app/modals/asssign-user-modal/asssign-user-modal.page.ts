import { Component, OnInit, Input } from '@angular/core';
import { ModalController, AlertController } from "@ionic/angular";
import { RestService } from '../../services/rest.service';
import {
  FormControl,
  FormGroup,
  FormBuilder,
  Validators
} from "@angular/forms";

@Component({
  selector: 'app-asssign-user-modal',
  templateUrl: './asssign-user-modal.page.html',
  styleUrls: ['./asssign-user-modal.page.scss'],
})
export class AsssignUserModalPage implements OnInit {

  @Input() task;
  project_users = [];
  public assignUserForm: FormGroup;
  form_sent = false;
  assignedUsers = [];

  constructor(
    private modalController: ModalController,
    private restService : RestService,
    private formBuilder: FormBuilder,
    public alertController: AlertController
  ) { 
    this.assignUserForm = this.formBuilder.group({
      user: new FormControl("", Validators.compose([Validators.required])),
    });
  }

  ngOnInit() {
    this.get_project_users();
    this.load_assigned_users();
  }

  load_assigned_users(){
    this.restService.get_method(`task/${this.task.id_task}`,'').subscribe(result =>{
      this.assignedUsers = result.data.assigned_users;
    });
  }

 dismiss() {
    this.modalController.dismiss({
      dismissed: true
    });
  }

  async remove_user(id_user){
    const alert = await this.alertController.create({
      header: 'Eliminar',
      subHeader: 'Está a punto de desasignar a este usurio de esta tarea',
      message: '¿Continuar?',
      buttons:[
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: (i) => {}
        }, 
        {
          text: 'OK',
          handler: () => {
            var data = {'user':id_user,'task':this.task.id_task}
            this.restService.put_method('usertask',data).subscribe(result =>{
              this.load_assigned_users();
            });  
          }
        }
      ]
    });
    await alert.present();
  }

  get_project_users(){
    this.restService.get_method(`project/${this.task.project}`,'').subscribe(result =>{
      var already_assign = []
      this.task.assigned_users.forEach((i)=>{
        already_assign.push(i['id']);
      });
      this.project_users = result.data.users.filter(function(i){
        return !already_assign.includes(i['id']);
      });
    });
  }


  asssignUser(){
    this.form_sent = true;
    if (this.assignUserForm.invalid) {
      return;
    } else {
      this.restService.post_method('usertask',{'user':this.assignUserForm.value.user,'task':this.task.id_task}).subscribe(result =>{
        if(result.status == 200){
          // recargar la lista de usuario asignados
          this.load_assigned_users();
        }else{
          this.restService.display_toast('Error',"danger",result.message,'top',4000);
        }
      });
    }
  }

}
