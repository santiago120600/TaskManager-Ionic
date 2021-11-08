import { Component, OnInit } from '@angular/core';
import { ModalController } from "@ionic/angular";

@Component({
  selector: 'app-users-project-modal',
  templateUrl: './users-project-modal.page.html',
  styleUrls: ['./users-project-modal.page.scss'],
})
export class UsersProjectModalPage implements OnInit {

  constructor(
    private modalController: ModalController,
  ) { }

  ngOnInit() {
  }

 dismiss() {
    this.modalController.dismiss({
      dismissed: true
    });
  }

}
