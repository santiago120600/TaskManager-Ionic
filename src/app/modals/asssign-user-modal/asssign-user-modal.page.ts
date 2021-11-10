import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from "@ionic/angular";
import { RestService } from '../../services/rest.service';

@Component({
  selector: 'app-asssign-user-modal',
  templateUrl: './asssign-user-modal.page.html',
  styleUrls: ['./asssign-user-modal.page.scss'],
})
export class AsssignUserModalPage implements OnInit {

  @Input() task;
  project_users: number;

  constructor(
    private modalController: ModalController,
    private restService : RestService,
  ) { 
  }

  ngOnInit() {
    this.get_project_users();
  }

 dismiss() {
    this.modalController.dismiss({
      dismissed: true
    });
  }

  get_project_users(){
    this.restService.get_method(`project/${this.task.project}`,'').subscribe(result =>{
      var already_assign = []
      this.task.assigned_users.forEach((i)=>{
        already_assign.push(i['id']);
      });
      this.project_users = result.data.users.filter(function(i){
        return !already_assign.includes(i['id']);
      });
    });
  }

}
