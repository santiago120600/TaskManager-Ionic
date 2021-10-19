import { Component, OnInit, Input } from '@angular/core';
import { ModalController, AlertController } from "@ionic/angular";
import { RestService } from '../../services/rest.service';
import {
  FormControl,
  FormGroup,
  FormBuilder,
  Validators
} from "@angular/forms";
import { GestureController } from "@ionic/angular";
@Component({
  selector: 'app-projects-modal',
  templateUrl: './projects-modal.page.html',
  styleUrls: ['./projects-modal.page.scss'],
})
export class ProjectsModalPage implements OnInit {

  public projectForm: FormGroup;
  form_sent = false;
  @Input() project;

  title_modal =  "Agregar Nuevo";
  name_project;
  id_project;
  button_txt = 'Agregar';

  constructor(
    private modalController: ModalController,
    private restService : RestService,
    private formBuilder: FormBuilder,
    private gestureCtrl: GestureController, 
    public alertController: AlertController
  ) { 
    this.projectForm = this.formBuilder.group({
      name_project: new FormControl("", Validators.compose([Validators.required])),
    });
  }

  ngOnInit() {
    console.log(this.project);
    if (this.project){
      this.projectForm.setValue({
        name_project: this.project.name_project 
      });
      this.title_modal = this.button_txt = "Actualizar";
      this.id_project = this.project.id;
    }
  }

  dismiss() {
    this.modalController.dismiss({
      dismissed: true
    });
  }

  
  async delete_project(id){
    const alert = await this.alertController.create({
      header: 'Eliminar',
      subHeader: 'Está a punto de eliminar el proyecto',
      message: 'Al eliminar el proyecto se eliminarán las tareas asosiadas',
      buttons:[
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: (i) => {}
        }, 
        {
          text: 'Continuar',
          handler: () => {
            this.restService.delete_method(`project/${id}`,'').subscribe(result =>{
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
    if (this.projectForm.invalid) {
      this.dismiss();
      this.restService.display_toast('Descartado','primary','Sin contenido','bottom',4000);
    } else {
      var {id_user} = await this.restService.authUserData();
      var form_data = this.projectForm.value;
      var data ={'name_project':form_data['name_project'], 'user':id_user};
      if(this.project){
        this.restService.put_method(`project/${this.project.id}`,data).subscribe(result =>{
          this.dismiss()
        });
      }else{
        this.restService.post_method('project',data).subscribe(result =>{
        // si no hay errores al registrar entonces cerrar el modal
          this.dismiss()
        });
      }
    }
  }

}
