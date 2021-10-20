import { Component, OnInit } from '@angular/core';
import { ModalController } from "@ionic/angular";
import {
  FormControl,
  FormGroup,
  FormBuilder,
  Validators
} from "@angular/forms";
import { AlertController } from "@ionic/angular";
import { RestService } from '../../services/rest.service';

@Component({
  selector: 'app-register-modal',
  templateUrl: './register-modal.page.html',
  styleUrls: ['./register-modal.page.scss'],
})
export class RegisterModalPage implements OnInit {
  public registerForm: FormGroup;
  form_sent = false;

  constructor(
    private modalController: ModalController,
    private formBuilder: FormBuilder,
    public alertController: AlertController,
    private restService : RestService,
  ) {
    this.registerForm = this.formBuilder.group({
      first_name: new FormControl("", Validators.compose([Validators.required])),
      last_name: new FormControl("", Validators.compose([Validators.required])),
      email: new FormControl("", Validators.compose([Validators.required])),
      password: new FormControl("", Validators.compose([Validators.required, Validators.minLength(8)])),
      username: new FormControl("", Validators.compose([Validators.required]))
    });
  }

  ngOnInit() {
  }


 dismiss() {
    this.modalController.dismiss({
      dismissed: true
    });
  }

  register(){
    this.form_sent = true;
    if (this.registerForm.invalid) {
      return;
    } else {
      this.restService.register(this.registerForm.value);
      //this.dismiss()
    }
  }

}
