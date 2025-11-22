import { Component } from '@angular/core';
import { Hero } from '../../components/hero/hero';
import { Features } from '../../components/features/features';
import { BanksList } from '../../components/banks-list/banks-list';

@Component({
  selector: 'app-home',
  imports: [Hero, Features, BanksList],
  templateUrl: './home.html',
})
export class Home {}
