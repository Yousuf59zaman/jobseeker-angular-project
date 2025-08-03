import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './nav.component.html'
})
export class NavComponent {
  eng: boolean = true;
  ban: boolean = false;

  selectLanguage(language: string) {
    if (language === 'ENG') {
      this.eng = true;
      this.ban = false;
    } else if (language === 'BAN') {
      this.eng = false;
      this.ban = true;
    }
  }
}
