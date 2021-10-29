import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PassoubliePage } from './passoublie.page';

const routes: Routes = [
  {
    path: '',
    component: PassoubliePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PassoubliePageRoutingModule {}
