import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

export interface SubMenuLink {
  title: string;
  route: string;
  description: string;
  linkText: string;
  icon: {
    name: string;
    svg: string[];
  };
}

@Component({
  selector: 'lib-sub-menu',
  imports: [RouterLink],
  templateUrl: './sub-menu.html',
})
export class SubMenu {
  readonly links = input.required<SubMenuLink[]>();
  readonly backLink = input.required<string>();
  readonly title = input.required<string>();
  readonly description = input.required<string>();
}
