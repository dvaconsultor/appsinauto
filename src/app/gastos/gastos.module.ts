import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GastosPageRoutingModule } from './gastos-routing.module';

import { GastosPage } from './gastos.page';
import { ComponentsModule } from '../components/components.module';
import { PopinfoComponent } from '../components/popinfo/popinfo.component';

@NgModule({
  entryComponents: [ PopinfoComponent],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GastosPageRoutingModule,
    ComponentsModule
  ],
  declarations: [GastosPage]
})
export class GastosPageModule {}
