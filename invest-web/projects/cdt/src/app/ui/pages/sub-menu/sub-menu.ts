import { Component } from '@angular/core';
import { SubMenuLink, SubMenu as SubMenuLib } from 'invest-web-lib';

@Component({
  selector: 'app-sub-menu',
  imports: [SubMenuLib],
  templateUrl: './sub-menu.html',
})
export class SubMenu {
  readonly title = 'Herramientas para Certificados de Depósito a Término (CDT)';
  readonly description =
    'Esta sección está diseñada para ayudarte a tomar decisiones informadas sobre tus inversiones en CDT. Puedes explorar una lista actualizada de tasas o usar nuestro simulador para comparar opciones y encontrar la que mejor se ajuste a tus objetivos financieros.';
  readonly links: SubMenuLink[] = [
    {
      title: 'Explorar tasas de CDT',
      route: './rates',
      description: 'Esta sección ofrece una lista actualizada de tasas de CDT de diversas entidades financieras.',
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
    {
      title: 'Encuentra y compara tu mejor tasa',
      route: './simulate',
      description: 'Ingresa el monto y el plazo de tu inversión para simular y comparar los rendimientos potenciales.',
      linkText: 'Comenzar a simular',
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
