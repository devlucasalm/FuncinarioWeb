import { Routes } from '@angular/router';

export const routes: Routes = [
    {
       path: 'funcionario',
       loadComponent: () => import('./pages/funcionario-list/funcionario-list.component').then(m => m.FuncionarioListComponent)
     },
     {
       path: '',
       redirectTo: 'funcionario',
       pathMatch: 'full'
     }
];
