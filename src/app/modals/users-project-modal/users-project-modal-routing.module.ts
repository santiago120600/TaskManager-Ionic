import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UsersProjectModalPage } from './users-project-modal.page';

const routes: Routes = [
  {
    path: '',
    component: UsersProjectModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsersProjectModalPageRoutingModule {}
