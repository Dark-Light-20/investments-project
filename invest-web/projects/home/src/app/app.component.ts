import { Component } from '@angular/core';
import { SummaryComponent } from './ui/components/summary/summary.component';

@Component({
  selector: 'app-root',
  imports: [SummaryComponent],
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'home';
}
