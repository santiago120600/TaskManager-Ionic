import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NotesModalPage } from './notes-modal.page';

const routes: Routes = [
  {
    path: '',
    component: NotesModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NotesModalPageRoutingModule {}
