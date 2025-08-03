import { Component, inject } from '@angular/core';
import { Router, Event, NavigationEnd, RouterOutlet } from '@angular/router';

import { IStaticMethods } from 'preline/preline';

import { NavComponent } from '../nav/nav.component';
import { FooterComponent } from '../footer/footer.component';

declare global {
  interface Window {
    HSStaticMethods: IStaticMethods;
  }
}

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterOutlet, NavComponent,FooterComponent],
  templateUrl: './layout.component.html'
})
export class LayoutComponent {

  router = inject(Router);

  ngOnInit() {
    this.relinitializePreline();
  }

  private relinitializePreline(){
    this.router.events.subscribe((event: Event) => {
      if(event instanceof NavigationEnd){
        if (typeof window !== "undefined") {
          setTimeout(() => {
            window.HSStaticMethods.autoInit();
          }, 100)
       }
      }
    })
  }

}
