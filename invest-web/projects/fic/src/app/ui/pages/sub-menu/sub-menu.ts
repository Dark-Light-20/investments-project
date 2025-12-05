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
      title: 'Explorar tasas de FICs',
      route: './rates',
      description: 'Esta sección ofrece una lista actualizada de tasas de FIC de diversas entidades financieras.',
      linkText: 'Ver todas las tasas',
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
  ];
}
