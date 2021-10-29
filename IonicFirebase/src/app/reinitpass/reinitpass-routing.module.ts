import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReinitpassPage } from './reinitpass.page';

const routes: Routes = [
  {
    path: '',
    component: ReinitpassPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReinitpassPageRoutingModule {}
