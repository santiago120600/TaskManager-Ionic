import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ComentariosNotaModalPageRoutingModule } from './comentarios-nota-modal-routing.module';

import { ComentariosNotaModalPage } from './comentarios-nota-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComentariosNotaModalPageRoutingModule
  ],
  declarations: [ComentariosNotaModalPage]
})
export class ComentariosNotaModalPageModule {}
