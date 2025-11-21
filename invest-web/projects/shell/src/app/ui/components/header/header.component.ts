import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  readonly iconPath = `${environment.assetsUrl}/LogoInvestApp.png`;

  readonly links: { text: string; path: string }[] = [
    { text: 'CDTs', path: '/cdts' },
    { text: 'FICs', path: '/fics' },
    { text: 'Bolsillos', path: '/pockets' },
  ];
}
