import { Component, OnInit, Input } from '@angular/core';
import { ModalController, AlertController } from "@ionic/angular";
import { RestService } from '../../services/rest.service';
import {
  FormControl,
  FormGroup,
  FormBuilder,
  Validator,
  Validators
} from "@angular/forms";
import * as moment from 'moment';
@Component({
  selector: 'app-notes-modal',
  templateUrl: './notes-modal.page.html',
  styleUrls: ['./notes-modal.page.scss'],
})
export class NotesModalPage implements OnInit {
  public noteForm: FormGroup;
  form_sent = false;
  @Input() note;
  @Input() id_project;
  @Input() completed;

  title;
  desc;
  title_modal =  "Agregar Nueva";
  button_txt = "Agregar"
  id_task;

  constructor(
    private modalController: ModalController,
    private restService : RestService,
    private formBuilder: FormBuilder,
    public alertController: AlertController,
  ) {
    this.noteForm = this.formBuilder.group({
      desc_task: new FormControl("", Validators.compose([Validators.required])),
      title_task: new FormControl("", Validators.compose([Validators.maxLength(80)])),
    });
  }

  ngOnInit() {
    if (this.note){
      this.noteForm.setValue({
        title_task: this.note.title_task, 
        desc_task: this.note.desc_task,
      });
      this.title_modal = this.button_txt = "Actualizar";
      this.completed = (this.note.completed) ? true : false; 
      this.id_task = this.note.id_task;
    }
  }

 dismiss() {
    this.modalController.dismiss({
      dismissed: true
    });
  }

  async delete_note(id){
    const alert = await this.alertController.create({
      header: 'Eliminar',
      subHeader: 'Está a punto de eliminar la nota',
      message: 'Al eliminar la nota se eliminarán las sub-tareas asosiadas',
      buttons:[
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: (i) => {}
        }, 
        {
          text: 'Continuar',
          handler: () => {
            this.restService.delete_method(`task/${id}`,'').subscribe(result =>{
              this.dismiss()
              this.restService.display_toast('Correcto','success','Eliminado correctamente','bottom',4000);
            });  
          }
        }
      ]
    });
    await alert.present();
  }


  async createOrUpdate(){
    this.form_sent = true;
    if (this.noteForm.invalid) {
      return;
    } else {
      var form_data = this.noteForm.value;
      var data ={'desc_task':form_data['desc_task'], 'project':this.id_project,'title_task':form_data['title_task']};
      if(this.completed){
        data['completed'] = true;
      }
      if(this.note){
        this.restService.put_method(`task/${this.note.id_task}`,data).subscribe(result =>{
          this.dismiss()
        });
      }else{
        this.restService.post_method('task',data).subscribe(result =>{
        // si no hay errores al registrar entonces cerrar el modal
          this.dismiss()
        });
      }
    }
  }

}
