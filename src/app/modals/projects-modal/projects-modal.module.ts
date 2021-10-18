import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProjectsModalPageRoutingModule } from './projects-modal-routing.module';

import { ProjectsModalPage } from './projects-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProjectsModalPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [ProjectsModalPage]
})
export class ProjectsModalPageModule {}
