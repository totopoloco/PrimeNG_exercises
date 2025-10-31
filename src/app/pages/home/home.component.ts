import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  template: `
    <div class="home-container">
      <p>Hello World!</p>
    </div>
  `,
  styles: [`
    .home-container {
      padding: 2rem;
    }

    p {
      font-size: 1rem;
      color: var(--text-color-secondary);
    }
  `]
})
export class HomeComponent {}
