import { Component } from '@angular/core';
import { HeroComponent } from '../../components/hero/hero.component';
import { FeaturesComponent } from '../../components/features/features.component';
import { BanksListComponent } from '../../components/banks-list/banks-list.component';

@Component({
  selector: 'app-home',
  imports: [HeroComponent, FeaturesComponent, BanksListComponent],
  templateUrl: './home.component.html',
})
export class HomeComponent {}
