import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from "@ionic/angular";

@Component({
  selector: 'app-comentarios-nota-modal',
  templateUrl: './comentarios-nota-modal.page.html',
  styleUrls: ['./comentarios-nota-modal.page.scss'],
})
export class ComentariosNotaModalPage implements OnInit {

  @Input() comments;
  @Input() id_task;

  constructor(
    private modalController: ModalController,
  ) { 
  }

  ngOnInit() {
    console.log(this.comments);
    console.log(this.id_task);
  }


 dismiss() {
    this.modalController.dismiss({
      dismissed: true
    });
  }

}
