import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-sub-menu',
  imports: [RouterLink],
  templateUrl: './sub-menu.html',
})
export class SubMenu {
  readonly links = [
    {
      title: 'Explore CDT Rates',
      route: './rates',
      description: 'This section provides an up-to-date list of CDT rates from various financial institutions.',
      linkText: 'View All Rates',
      icon: {
        name: 'icon-tabler-list-details',
        svg: [
          'M13 5h8',
          'M13 9h5',
          'M13 13h8',
          'M13 19h5',
          'M3 4m0 1a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v4a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1z',
          'M3 14m0 1a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v4a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1z',
        ],
      },
    },
    {
      title: 'Find & Compare Your Best Rate',
      route: './calculate',
      description: 'Input your investment amount and term to calculate and compare potential returns.',
      linkText: 'Start Calculating',
      icon: {
        name: 'icon-tabler-template',
        svg: [
          'M4 4m0 1a1 1 0 0 1 1 -1h14a1 1 0 0 1 1 1v2a1 1 0 0 1 -1 1h-14a1 1 0 0 1 -1 -1z',
          'M4 12m0 1a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v6a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1z',
          'M14 12l6 0',
          'M14 16l6 0',
          'M14 20l6 0',
        ],
      },
    },
  ];
}
