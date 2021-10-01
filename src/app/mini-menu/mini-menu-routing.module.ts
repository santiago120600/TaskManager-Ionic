import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MiniMenuPage } from './mini-menu.page';

const routes: Routes = [
  {
    path: '',
    component: MiniMenuPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MiniMenuPageRoutingModule {}
