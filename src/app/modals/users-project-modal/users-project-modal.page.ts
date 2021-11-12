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
  selector: 'app-users-project-modal',
  templateUrl: './users-project-modal.page.html',
  styleUrls: ['./users-project-modal.page.scss'],
})
export class UsersProjectModalPage implements OnInit {

  @Input() id_project;
  users = [];

  public addUserForm: FormGroup;
  form_sent = false;

  constructor(
    private modalController: ModalController,
    private restService : RestService,
    private formBuilder: FormBuilder,
  ) { 
    this.addUserForm = this.formBuilder.group({
      username: new FormControl("", Validators.compose([Validators.required])),
    });
  }

  ngOnInit() {
    this.load_users();
  }

 dismiss() {
    this.modalController.dismiss({
      dismissed: true
    });
  }

  load_users(){
    this.restService.get_method(`project/${this.id_project}`,'').subscribe(result =>{
      this.users = result.data.users;
    });
  }

  addUser(){
    this.form_sent = true;
    if (this.addUserForm.invalid) {
      return;
    } else {
      this.restService.post_method('adduserproject',{'username':this.addUserForm.value.username,'project':this.id_project}).subscribe(result =>{
        if(result.status == 404){
          this.restService.display_toast('Error',"danger",'Usuario no encontrado','top',4000);
        }else if(result.status == 201){
          this.load_users();
        }else{
          this.restService.display_toast('Error',"danger",result.message,'top',4000);
        }
        this.addUserForm.reset();
        this.addUserForm.controls.username.setErrors(null);
      });
    }
  }

}
