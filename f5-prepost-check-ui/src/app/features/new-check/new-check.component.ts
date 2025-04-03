import { Component } from '@angular/core';
import { PreCheckFormComponent } from './pre-check-form/pre-check-form.component';

@Component({
  selector: 'app-new-check',
  templateUrl: './new-check.component.html',
  styleUrls: ['./new-check.component.scss'],
  imports: [PreCheckFormComponent]
})
export class NewCheckComponent {
  // This component serves as a container for the pre-check form
}