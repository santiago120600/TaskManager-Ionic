import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SelectProjectMenuPage } from './select-project-menu.page';

const routes: Routes = [
  {
    path: '',
    component: SelectProjectMenuPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SelectProjectMenuPageRoutingModule {}
