import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./features/dashboard/dashboard.module').then(m => m.DashboardModule)
  },
  {
    path: 'new-check',
    loadChildren: () => import('./features/new-check/new-check.module').then(m => m.NewCheckModule)
  },
  {
    path: 'batch/:id',
    loadChildren: () => import('./features/batch-details/batch-details.module').then(m => m.BatchDetailsModule)
  },
  {
    path: 'diff/:id',
    loadChildren: () => import('./features/diff-viewer/diff-viewer.module').then(m => m.DiffViewerModule)
  },
  {
    path: 'history',
    loadChildren: () => import('./features/history/history.module').then(m => m.HistoryModule)
  },
  {
    path: '**',
    redirectTo: 'dashboard'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }