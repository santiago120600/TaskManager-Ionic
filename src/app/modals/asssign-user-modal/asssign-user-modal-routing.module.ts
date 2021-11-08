import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AsssignUserModalPage } from './asssign-user-modal.page';

const routes: Routes = [
  {
    path: '',
    component: AsssignUserModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AsssignUserModalPageRoutingModule {}
