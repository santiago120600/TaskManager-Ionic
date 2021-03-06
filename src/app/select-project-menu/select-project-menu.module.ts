import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SelectProjectMenuPageRoutingModule } from './select-project-menu-routing.module';

import { SelectProjectMenuPage } from './select-project-menu.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SelectProjectMenuPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [SelectProjectMenuPage]
})
export class SelectProjectMenuPageModule {}
