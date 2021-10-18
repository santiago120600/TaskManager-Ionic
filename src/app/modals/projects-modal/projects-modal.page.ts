import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from "@ionic/angular";
import { RestService } from '../../services/rest.service';
import {
  FormControl,
  FormGroup,
  FormBuilder,
  Validators
} from "@angular/forms";
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

  constructor(
    private modalController: ModalController,
    private restService : RestService,
    private formBuilder: FormBuilder,
  ) { 
    this.projectForm = this.formBuilder.group({
      name_project: new FormControl("", Validators.compose([Validators.required])),
    });
  }

  ngOnInit() {
    if (this.project){
      this.projectForm.setValue({
        name_project: this.project.name_project 
      });
      this.title_modal = "Actualizar";
    }
  }

  dismiss() {
    this.modalController.dismiss({
      dismissed: true
    });
  }

  async createOrUpdate(){
    this.form_sent = true;
    if (this.projectForm.invalid) {
      return;
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
          //this.notesPage.load_notes();
        });
      }
    }
  }

}
