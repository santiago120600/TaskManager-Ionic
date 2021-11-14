import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from "@ionic/angular";
import { RestService } from '../../services/rest.service';

@Component({
  selector: 'app-task-files-modal',
  templateUrl: './task-files-modal.page.html',
  styleUrls: ['./task-files-modal.page.scss'],
})
export class TaskFilesModalPage implements OnInit {
  @Input() id_task;
  files = [];

  constructor(
    private modalController: ModalController,
    private restService : RestService,
  ) { }

  ngOnInit() {
    this.load_files();
  }

  dismiss() {
    this.modalController.dismiss({
      dismissed: true
    });
  }

  load_files(){
    this.restService.get_method(`task/${this.id_task}`,'').subscribe(result =>{
      this.files = result.data.files;
    });
  }

}
