import { Component } from '@angular/core';

@Component({
  selector: 'app-features',
  templateUrl: './features.html',
})
export class Features {
  readonly features = [
    {
      title: 'Compara Tasas',
      description:
        'Visualiza el listado completo de tasas E.A., con sus montos mínimos, máximos y plazos, de cada entidad bancaria.',
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
      title: 'Encuentra tu Tasa',
      description:
        'Ingresa el monto y los días de tu inversión y te mostraremos exactamente qué tasas aplican para ti.',
      icon: {
        name: 'icon-tabler-list-search',
        svg: ['M15 15m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0', 'M18.5 18.5l2.5 2.5', 'M4 6h16', 'M4 12h4', 'M4 18h4'],
      },
    },
    {
      title: 'Calcula tu Ganancia',
      description: 'Simula tu inversión y descubre el valor de tu ganancia estimada al finalizar el plazo.',
      icon: {
        name: 'icon-tabler-cash-plus',
        svg: [
          'M7 15h-3a1 1 0 0 1 -1 -1v-8a1 1 0 0 1 1 -1h12a1 1 0 0 1 1 1v3',
          'M12 19h-4a1 1 0 0 1 -1 -1v-8a1 1 0 0 1 1 -1h12a1 1 0 0 1 1 1v2.5',
          'M12 14a2 2 0 1 0 4 0a2 2 0 0 0 -4 0',
          'M16 19h6',
          'M19 16v6',
        ],
      },
    },
  ];
}
