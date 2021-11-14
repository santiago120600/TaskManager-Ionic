import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TaskFilesModalPageRoutingModule } from './task-files-modal-routing.module';

import { TaskFilesModalPage } from './task-files-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TaskFilesModalPageRoutingModule
  ],
  declarations: [TaskFilesModalPage]
})
export class TaskFilesModalPageModule {}
