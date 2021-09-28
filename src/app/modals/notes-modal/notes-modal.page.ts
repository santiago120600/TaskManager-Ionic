import { Component, OnInit } from '@angular/core';
import { ModalController } from "@ionic/angular";
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

  constructor(
    private modalController: ModalController,
    private restService : RestService,
    private formBuilder: FormBuilder,
  ) {
    this.noteForm = this.formBuilder.group({
      desc_task: new FormControl("", Validators.compose([Validators.required])),
      title_task: new FormControl("", Validators.compose([Validators.required])),
      due_date_task: new FormControl("", Validators.compose([Validators.required])),
    });
  }

  ngOnInit() {
  }

 dismiss() {
    this.modalController.dismiss({
      dismissed: true
    });
  }


  async new_note(){
    this.form_sent = true;
    if (this.noteForm.invalid) {
      return;
    } else {
      var {id_user} = await this.restService.authUserData();
      var form_data = this.noteForm.value;
      //var data = {};
      //for (const key in  form_data){
        //data = {key : form_data[key]};
      //}
      var date = moment(form_data['due_date_task']).format('YYYY-MM-DD');
      //data = {...data, 'user': id_user};
      console.log(form_data['due_date_task']);
      this.restService.post_method('task',{'desc_task':form_data['desc_task'], 'user':id_user,'title_task':form_data['title_task'],'due_date_task':date}).subscribe(result =>{
      // si no hay errores al registrar entonces cerrar el modal
        this.dismiss()
        //this.notesPage.load_notes();
      });
    }
  }

}
