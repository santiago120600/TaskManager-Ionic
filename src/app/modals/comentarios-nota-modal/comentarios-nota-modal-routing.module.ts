import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ComentariosNotaModalPage } from './comentarios-nota-modal.page';

const routes: Routes = [
  {
    path: '',
    component: ComentariosNotaModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ComentariosNotaModalPageRoutingModule {}
