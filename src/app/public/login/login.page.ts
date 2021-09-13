import { Component, OnInit } from '@angular/core';
import { RestService } from '../../services/rest.service';
import { ModalController } from '@ionic/angular';
import { RegisterModalPage } from '../../modals/register-modal/register-modal.page';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(
    private restService : RestService,
    private modalController: ModalController
  ) { }

  ngOnInit() {
  }

 credentials = {
        "username":"santy",
        "password":"1234"
    };


 do_login(){
    this.restService.login(this.credentials);
  }

 async register(){
    const modal = await this.modalController.create({
      component: RegisterModalPage
    });
    return await modal.present();
  };

}
