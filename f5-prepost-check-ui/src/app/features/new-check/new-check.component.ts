import { Component } from '@angular/core';
import { PreCheckFormComponent } from './pre-check-form/pre-check-form.component';
import { PostCheckFormComponent } from './post-check-form.component';
import { DiffyComponent } from './diffy/diffy.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-new-check',
  templateUrl: './new-check.component.html',
  styleUrls: ['./new-check.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterModule, PreCheckFormComponent, PostCheckFormComponent, DiffyComponent]
})
export class NewCheckComponent {
  // This component serves as a container for the pre-check form
}