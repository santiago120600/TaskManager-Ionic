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
  comments = [
    {"desc_comment":"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."},
    {"desc_comment":"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."}
  ];
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
  }


 dismiss() {
    this.modalController.dismiss({
      dismissed: true
    });
  }


  newComment(){
    this.form_sent = true;
    if (this.commentForm.invalid) {
      return;
    } else {
      console.log("OK");
    }
  }

}
