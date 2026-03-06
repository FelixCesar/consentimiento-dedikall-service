import { Routes } from '@angular/router';
import { Auth } from './auth/auth';
import { Panel } from './panel/panel';
import { Datos } from './datos/datos';

export const routes: Routes = [
  {
    path: '',
    component: Auth
  },
  {
    path: 'panel',
    component: Panel
  },
  {
    path: 'datos',
    component: Datos
  },
  {
    path: '**',
    redirectTo: ''
  }
];