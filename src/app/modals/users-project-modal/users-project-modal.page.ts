import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from "@ionic/angular";
import { RestService } from '../../services/rest.service';

@Component({
  selector: 'app-users-project-modal',
  templateUrl: './users-project-modal.page.html',
  styleUrls: ['./users-project-modal.page.scss'],
})
export class UsersProjectModalPage implements OnInit {

  @Input() id_project;
  users = [];

  constructor(
    private modalController: ModalController,
    private restService : RestService,
  ) { 
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

}
