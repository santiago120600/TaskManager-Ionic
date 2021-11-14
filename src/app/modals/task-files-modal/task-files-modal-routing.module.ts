import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TaskFilesModalPage } from './task-files-modal.page';

const routes: Routes = [
  {
    path: '',
    component: TaskFilesModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TaskFilesModalPageRoutingModule {}
