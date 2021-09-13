import { Component, OnInit } from '@angular/core';
import { ModalController } from "@ionic/angular";
import {
  FormControl,
  FormGroup,
  FormBuilder,
  Validator,
  Validators
} from "@angular/forms";
import { ToastController } from "@ionic/angular";
import { AlertController } from "@ionic/angular";
import { RestService } from '../../services/rest.service';

@Component({
  selector: 'app-register-modal',
  templateUrl: './register-modal.page.html',
  styleUrls: ['./register-modal.page.scss'],
})
export class RegisterModalPage implements OnInit {

  constructor(
    private modalController: ModalController,
    private formBuilder: FormBuilder,
    public toastController: ToastController,
    public alertController: AlertController,
    private restService : RestService,
  ) { }

  ngOnInit() {
  }

 async show_toast(_message, _color) {
    const toast = await this.toastController.create({
      message: _message,
      duration: 2000,
      color: _color
    });
    toast.present();
  }

 dismiss() {
    this.modalController.dismiss({
      dismissed: true
    });
  }

}
