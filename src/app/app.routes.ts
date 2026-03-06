import { Routes } from '@angular/router';
import { Auth } from './auth/auth';
import { Panel } from './panel/panel';
import { Datos } from './datos/datos';
import { Enviado } from './pages/enviado/enviado';
import { VerDatosComponent } from './ver-datos/ver-datos';



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
      path: 'enviado',
      component: Enviado

  },
{
  path: 'datos/:id',
  loadComponent: () =>
    import('./ver-datos/ver-datos').then(m => m.VerDatosComponent)
},
  {
    path: '**',
    redirectTo: ''
  }
];