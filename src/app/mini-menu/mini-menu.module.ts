import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MiniMenuPageRoutingModule } from './mini-menu-routing.module';

import { MiniMenuPage } from './mini-menu.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MiniMenuPageRoutingModule
  ],
  declarations: [MiniMenuPage]
})
export class MiniMenuPageModule {}
