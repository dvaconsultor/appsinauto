import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PopinfoComponent } from './popinfo/popinfo.component';
import { IonicModule } from '@ionic/angular';
import { SalidainfoComponent } from './salidainfo/salidainfo.component';


@NgModule({
  declarations: [ PopinfoComponent,SalidainfoComponent],
  exports: [ PopinfoComponent,SalidainfoComponent],
  imports: [
    CommonModule,
    IonicModule
  ]
})
export class ComponentsModule { }
