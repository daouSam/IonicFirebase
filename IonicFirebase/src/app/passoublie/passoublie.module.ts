import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PassoubliePageRoutingModule } from './passoublie-routing.module';

import { PassoubliePage } from './passoublie.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PassoubliePageRoutingModule
  ],
  declarations: [PassoubliePage]
})
export class PassoubliePageModule {}
