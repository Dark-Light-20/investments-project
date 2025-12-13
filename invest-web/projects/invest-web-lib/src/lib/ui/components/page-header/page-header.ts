import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'lib-page-header',
  imports: [RouterLink],
  templateUrl: './page-header.html',
})
export class PageHeader {
  readonly backLink = input.required<string>();
  readonly title = input.required<string>();
  readonly subtitle = input<string>('');
}
