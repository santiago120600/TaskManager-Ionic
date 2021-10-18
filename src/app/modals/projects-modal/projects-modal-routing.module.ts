import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProjectsModalPage } from './projects-modal.page';

const routes: Routes = [
  {
    path: '',
    component: ProjectsModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProjectsModalPageRoutingModule {}
