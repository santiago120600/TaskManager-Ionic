import { Component, OnInit, Input } from '@angular/core';
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
  @Input() note;
  @Input() id_project;

  title;
  due_date;
  desc;
  completed = false;
  title_modal =  "Agregar Nueva";
  button_txt = "Agregar"

  constructor(
    private modalController: ModalController,
    private restService : RestService,
    private formBuilder: FormBuilder,
  ) {
    this.noteForm = this.formBuilder.group({
      desc_task: new FormControl("", Validators.compose([Validators.required])),
      title_task: new FormControl("", Validators.compose([Validators.required])),
      due_date_task: new FormControl("", Validators.compose([Validators.required])),
      completed: new FormControl(),
    });
  }

  ngOnInit() {
    if (this.note){
      this.noteForm.setValue({
        title_task: this.note.title_task, 
        desc_task: this.note.desc_task,
        due_date_task:this.note.due_date_task, 
      });
      this.title_modal = this.button_txt = "Actualizar";
      this.completed = (this.note.completed) ? true : false; 
    }
  }

 dismiss() {
    this.modalController.dismiss({
      dismissed: true
    });
  }


  async createOrUpdate(){
    this.form_sent = true;
    if (this.noteForm.invalid) {
      //console.log(this.noteForm.value['completed']);
      return;
    } else {
      var form_data = this.noteForm.value;
      var date = moment(form_data['due_date_task']).format('YYYY-MM-DD');
      var data ={'desc_task':form_data['desc_task'], 'project':this.id_project,'title_task':form_data['title_task'],'due_date_task':date};
      if(this.note){
        this.restService.put_method(`task/${this.note.id_task}`,data).subscribe(result =>{
          this.dismiss()
        });
      }else{
        //var data = {};
        //for (const key in  form_data){
          //data = {key : form_data[key]};
        //}
        //data = {...data, 'user': id_user};
        this.restService.post_method('task',data).subscribe(result =>{
        // si no hay errores al registrar entonces cerrar el modal
          this.dismiss()
        });
      }
    }
  }

}
