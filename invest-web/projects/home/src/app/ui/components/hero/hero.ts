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
      link: '/cdts/simulate',
    },
    {
      label: 'Consulta tu FIC',
      link: '/fics/rates',
    },
    {
      label: 'Simula tu bolsillo',
      link: '/pockets/simulate',
    },
  ];
  readonly infoButton = {
    label: 'Conocer más',
    link: '',
    fragment: 'features',
    iconLabel: '→',
  };
}
