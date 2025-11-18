import { Component } from '@angular/core';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-banks-list',
  templateUrl: './banks-list.component.html',
})
export class BanksListComponent {
  readonly banks = [
    { name: 'Bancolombia', logo: `${environment.assetsUrl}/logos/LogoBancolombia.png` },
    { name: 'Banco de Bogotá', logo: `${environment.assetsUrl}/logos/LogoBancoDeBogota.png` },
    { name: 'Ban100', logo: `${environment.assetsUrl}/logos/LogoBan100.png` },
    { name: 'Nu', logo: `${environment.assetsUrl}/logos/LogoNu.png` },
    { name: 'Banco Finandina', logo: `${environment.assetsUrl}/logos/LogoFinandina.png` },
  ];
}
