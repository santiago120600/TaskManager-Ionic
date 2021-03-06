import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UsersProjectModalPageRoutingModule } from './users-project-modal-routing.module';

import { UsersProjectModalPage } from './users-project-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UsersProjectModalPageRoutingModule, 
    ReactiveFormsModule
  ],
  declarations: [UsersProjectModalPage]
})
export class UsersProjectModalPageModule {}
