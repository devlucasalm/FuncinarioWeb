import { Routes } from '@angular/router';

export const routes: Routes = [
    {
       path: 'funcionario',
       loadComponent: () => import('./pages/funcionario-list/funcionario-list.component').then(m => m.FuncionarioListComponent)
     },
     {
      path: 'funcionario/new',
      loadComponent: () => import('./pages/funcionario-form/funcionario-form.component').then(m => m.FuncionarioFormComponent)
     },
     {
       path: 'funcionario/:id',
       loadComponent: () => import('./pages/funcionario-edit/funcionario-edit.component').then(m => m.FuncionarioEditComponent)
     },
     {
       path: '',
       redirectTo: 'funcionario',
       pathMatch: 'full'
     }
];
