import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-hero',
  imports: [RouterLink],
  templateUrl: './hero.html',
})
export class Hero {
  readonly actionButtons = [
    {
      label: 'Simula tu CDT',
      link: '/cdts/calculate',
    },
    {
      label: 'Consulta tu FIC',
      link: '/fics',
    },
    {
      label: 'Simula tu bolsillo',
      link: '/pockets/calculate',
    },
  ];
  readonly infoButton = {
    label: 'Conocer más',
    link: '',
    fragment: 'features',
    iconLabel: '→',
  };
}
