import { Component } from '@angular/core';
import { ChildrenOutletContexts, RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../layouts/header/header.component';
import { fadeSlideAnimation } from '../../animations/route-animations';

@Component({
  selector: 'app-root-container',
  imports: [RouterOutlet, HeaderComponent],
  templateUrl: './root-container.component.html',
  styleUrl: './root-container.component.scss',
  animations: [fadeSlideAnimation],
})
export class RootContainerComponent {
  constructor(private contexts: ChildrenOutletContexts) {}

  getRouteAnimationData() {
    return this.contexts.getContext('primary')?.route?.snapshot?.data?.[
      'animation'
    ];
  }
}
