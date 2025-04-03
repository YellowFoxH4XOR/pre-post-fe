import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewCheckComponent } from './new-check.component';

const routes: Routes = [
  {
    path: '',
    component: NewCheckComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NewCheckRoutingModule { }
