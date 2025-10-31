import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from './sidebar/sidebar.component';
import { TopbarComponent } from './topbar/topbar.component';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, SidebarComponent, TopbarComponent],
  template: `
    <div class="layout-wrapper">
      <app-sidebar />

      <div class="layout-main">
        <app-topbar />

        <main class="content">
          <router-outlet />
        </main>
      </div>
    </div>
  `,
  styles: [`
    .layout-wrapper {
      display: flex;
      min-height: 100vh;
      background-color: var(--surface-ground);
    }

    .layout-main {
      flex: 1;
      display: flex;
      flex-direction: column;
      overflow: hidden;
    }

    .content {
      flex: 1;
      overflow-y: auto;
      background-color: var(--surface-ground);
    }
  `]
})
export class LayoutComponent {}
