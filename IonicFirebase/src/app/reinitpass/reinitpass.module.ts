import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReinitpassPageRoutingModule } from './reinitpass-routing.module';

import { ReinitpassPage } from './reinitpass.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReinitpassPageRoutingModule
  ],
  declarations: [ReinitpassPage]
})
export class ReinitpassPageModule {}
