import { Component } from '@angular/core';
import { RouterModule, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [RouterModule, RouterLink, RouterLinkActive],
  standalone: true
})
export class AppComponent {
  title = 'f5-prepost-check-ui';
}
