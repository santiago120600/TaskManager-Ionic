import { Component, OnInit } from '@angular/core';
import { RestService } from '../../services/rest.service';
import { ModalController } from '@ionic/angular';
import { RegisterModalPage } from '../../modals/register-modal/register-modal.page';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public loginForm: FormGroup;
  form_sent = false;

  constructor(
    private restService : RestService,
    private modalController: ModalController,
    private formBuilder: FormBuilder,
  ) { 
     this.loginForm = this.formBuilder.group({
      username: new FormControl("", Validators.compose([Validators.required])),
      password: new FormControl("", Validators.compose([Validators.required]))
    });
  }

  ngOnInit() {
  }

 do_login(){
    this.form_sent = true;
    if (this.loginForm.invalid) {
      this.restService.display_toast('Error','danger','Los campos son obligatorios','top',4000);
    } else {
      this.restService.login(this.loginForm.value);
    }
  }

 async register(){
    const modal = await this.modalController.create({
      component: RegisterModalPage
    });
    return await modal.present();
  };

}
