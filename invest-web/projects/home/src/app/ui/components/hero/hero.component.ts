import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-hero',
  imports: [RouterLink],
  templateUrl: './hero.component.html',
})
export class HeroComponent {
  readonly actionButtons = [
    {
      label: 'Simula tu CDT',
      link: '/cdts',
      iconLabel: '+',
    },
    {
      label: 'Simula tu FIC',
      link: '/fics',
      iconLabel: '+',
    },
    {
      label: 'Simula tu bolsillo',
      link: '/pockets',
      iconLabel: '+',
    },
  ];
  readonly infoButton = {
    label: 'Conocer más',
    link: '',
    fragment: 'features',
    iconLabel: '→',
  };
}
