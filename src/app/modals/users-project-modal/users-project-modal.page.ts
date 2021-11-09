import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from "@ionic/angular";

@Component({
  selector: 'app-users-project-modal',
  templateUrl: './users-project-modal.page.html',
  styleUrls: ['./users-project-modal.page.scss'],
})
export class UsersProjectModalPage implements OnInit {

  @Input() id_project;

  constructor(
    private modalController: ModalController,
  ) { 
    console.log(this.id_project);
  }

  ngOnInit() {
  }

 dismiss() {
    this.modalController.dismiss({
      dismissed: true
    });
  }

}
