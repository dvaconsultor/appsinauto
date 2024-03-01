import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AcumuladoPage } from './acumulado.page';

const routes: Routes = [
  {
    path: '',
    component: AcumuladoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AcumuladoPageRoutingModule {}
