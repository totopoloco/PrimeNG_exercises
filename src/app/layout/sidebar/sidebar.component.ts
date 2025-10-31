import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { SidebarService } from '../../core/services/sidebar.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule, ButtonModule],
  template: `
    <aside class="sidebar" [class.collapsed]="sidebarService.isCollapsed()">
      <div class="sidebar-header">
        @if (!sidebarService.isCollapsed()) {
          <h2>My App</h2>
        }
      </div>

      <nav class="sidebar-nav">
        <a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}" class="nav-item">
          <i class="pi pi-home"></i>
          @if (!sidebarService.isCollapsed()) {
            <span>Home</span>
          }
        </a>
      </nav>

      <div class="sidebar-footer">
        <a routerLink="/settings" routerLinkActive="active" class="nav-item">
          <i class="pi pi-cog"></i>
          @if (!sidebarService.isCollapsed()) {
            <span>Settings</span>
          }
        </a>
      </div>
    </aside>
  `,
  styles: [`
    .sidebar {
      width: 250px;
      height: 100vh;
      background-color: var(--surface-card);
      border-right: 1px solid var(--surface-border);
      display: flex;
      flex-direction: column;
      transition: width 0.3s ease;
      overflow: hidden;
    }

    .sidebar.collapsed {
      width: 70px;
    }

    .sidebar-header {
      padding: 1.5rem;
      border-bottom: 1px solid var(--surface-border);
      min-height: 70px;
      display: flex;
      align-items: center;
    }

    .sidebar-header h2 {
      margin: 0;
      font-size: 1.25rem;
      font-weight: 600;
      color: var(--text-color);
      white-space: nowrap;
    }

    .sidebar-nav {
      flex: 1;
      padding: 1rem 0;
      overflow-y: auto;
    }

    .nav-item {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      padding: 0.75rem 1.5rem;
      color: var(--text-color);
      text-decoration: none;
      transition: background-color 0.2s;
      white-space: nowrap;
    }

    .sidebar.collapsed .nav-item {
      justify-content: center;
      padding: 0.75rem 1rem;
    }

    .nav-item:hover {
      background-color: var(--surface-hover);
    }

    .nav-item.active {
      background-color: var(--primary-color);
      color: var(--primary-color-text);
    }

    .nav-item i {
      font-size: 1.25rem;
      flex-shrink: 0;
    }

    .nav-item span {
      font-size: 0.9375rem;
    }

    .sidebar-footer {
      padding: 1rem 0;
      border-top: 1px solid var(--surface-border);
    }
  `]
})
export class SidebarComponent {
  sidebarService = inject(SidebarService);
}
