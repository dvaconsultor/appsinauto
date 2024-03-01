import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'empleado',
    loadChildren: () => import('./pages/empleado/empleado.module').then( m => m.EmpleadoPageModule)
  },
  {
    path: 'chofer',
    loadChildren: () => import('./pages/chofer/chofer.module').then( m => m.ChoferPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'salidas',
    loadChildren: () => import('./salidas/salidas.module').then( m => m.SalidasPageModule)
  },
  {
    path: 'entradas',
    loadChildren: () => import('./entradas/entradas.module').then( m => m.EntradasPageModule)
  },
  {
    path: 'servicios',
    loadChildren: () => import('./servicios/servicios.module').then( m => m.ServiciosPageModule)
  },
  {
    path: 'gastos',
    loadChildren: () => import('./gastos/gastos.module').then( m => m.GastosPageModule)
  },
  {
    path: 'detalle-servicio',
    loadChildren: () => import('./detalle-servicio/detalle-servicio.module').then( m => m.DetalleServicioPageModule)
  },
  {
    path: 'acumulado',
    loadChildren: () => import('./acumulado/acumulado.module').then( m => m.AcumuladoPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
