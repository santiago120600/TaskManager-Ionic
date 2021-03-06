import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AsssignUserModalPageRoutingModule } from './asssign-user-modal-routing.module';

import { AsssignUserModalPage } from './asssign-user-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AsssignUserModalPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [AsssignUserModalPage]
})
export class AsssignUserModalPageModule {}
