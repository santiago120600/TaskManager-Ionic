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
  selector: 'app-comentarios-nota-modal',
  templateUrl: './comentarios-nota-modal.page.html',
  styleUrls: ['./comentarios-nota-modal.page.scss'],
})
export class ComentariosNotaModalPage implements OnInit {

  @Input() id_task;
  comments = [];
  public commentForm: FormGroup;
  form_sent = false;

  constructor(
    private modalController: ModalController,
    private formBuilder: FormBuilder,
    private restService : RestService,
  ) { 
    this.commentForm = this.formBuilder.group({
      comment: new FormControl("", Validators.compose([Validators.required])),
    });
  }

  ngOnInit() {
    this.load_comments();
  }

  load_comments(){
    this.restService.get_method(`comment?task_id=${this.id_task}`,'').subscribe(result =>{
      this.comments = result.data;
    });
  }


 dismiss() {
    this.modalController.dismiss({
      dismissed: true
    });
  }


  async newComment(){
    this.form_sent = true;
    if (this.commentForm.invalid) {
      return;
    } else {
      var {id_user} = await this.restService.authUserData();
      var data ={'desc_comment':this.commentForm.value.comment, 'user':id_user, 'task':this.id_task};
      this.restService.post_method('comment',data).subscribe(result =>{
        this.load_comments();
        this.commentForm.reset();
        this.commentForm.controls.comment.setErrors(null);
      });
    }
  }

}
