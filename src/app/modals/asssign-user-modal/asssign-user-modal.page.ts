import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from "@ionic/angular";

@Component({
  selector: 'app-asssign-user-modal',
  templateUrl: './asssign-user-modal.page.html',
  styleUrls: ['./asssign-user-modal.page.scss'],
})
export class AsssignUserModalPage implements OnInit {

  @Input() id_task;
  @Input() users;

  constructor(
    private modalController: ModalController,
  ) { 
    console.log(this.id_task);
    console.log(this.users);
  }

  ngOnInit() {
  }

 dismiss() {
    this.modalController.dismiss({
      dismissed: true
    });
  }

}
