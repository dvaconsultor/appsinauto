import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AcumuladoPageRoutingModule } from './acumulado-routing.module';

import { AcumuladoPage } from './acumulado.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AcumuladoPageRoutingModule
  ],
  declarations: [AcumuladoPage]
})
export class AcumuladoPageModule {}
