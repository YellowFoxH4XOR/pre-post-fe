import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewCheckRoutingModule } from './new-check-routing.module';
import { NewCheckComponent } from './new-check.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    NewCheckRoutingModule,
    SharedModule,
    NewCheckComponent
  ],
  exports: []
})
export class NewCheckModule {}
