import { Component } from '@angular/core';
import { SummaryComponent } from './ui/components/summary/summary.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [SummaryComponent],
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'home';
}
