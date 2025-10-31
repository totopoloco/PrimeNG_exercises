import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs';
import { SidebarService } from '../../core/services/sidebar.service';

@Component({
  selector: 'app-topbar',
  standalone: true,
  imports: [CommonModule, ButtonModule],
  template: `
    <header class="topbar">
      <div class="topbar-start">
        <p-button
          [icon]="sidebarService.isCollapsed() ? 'pi pi-angle-right' : 'pi pi-angle-left'"
          [outlined]="true"
          [rounded]="true"
          (onClick)="sidebarService.toggle()"
          styleClass="toggle-button"
        />
        <div class="page-info">
          <h1 class="page-title">{{ pageTitle }}</h1>
          <p class="page-description">{{ pageDescription }}</p>
        </div>
      </div>

      <div class="topbar-end">
      </div>
    </header>
  `,
  styles: [`
    .topbar {
      height: 70px;
      background-color: var(--surface-card);
      border-bottom: 1px solid var(--surface-border);
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 1.5rem;
      position: sticky;
      top: 0;
      z-index: 100;
    }

    .topbar-start,
    .topbar-end {
      display: flex;
      align-items: center;
      gap: 1rem;
    }

    .page-info {
      display: flex;
      flex-direction: column;
      gap: 0.125rem;
    }

    .page-title {
      font-size: 1.25rem;
      font-weight: 600;
      color: var(--text-color);
      margin: 0;
      line-height: 1.2;
    }

    .page-description {
      font-size: 0.875rem;
      color: var(--text-color-secondary);
      margin: 0;
      line-height: 1.2;
    }

    @media (max-width: 768px) {
      .topbar {
        padding: 0 1rem;
      }

      .page-title {
        font-size: 1.125rem;
      }

      .page-description {
        font-size: 0.8125rem;
      }
    }
  `]
})
export class TopbarComponent implements OnInit {
  sidebarService = inject(SidebarService);
  private router = inject(Router);

  pageTitle = 'Home';
  pageDescription = 'Welcome to your dashboard';

  ngOnInit(): void {
    this.updatePageInfo();

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.updatePageInfo();
    });
  }

  private updatePageInfo(): void {
    const routeData = this.getRouteData();
    this.pageTitle = routeData.title || 'Home';
    this.pageDescription = routeData.description || '';
  }

  private getRouteData(): any {
    let route = this.router.routerState.root;
    while (route.firstChild) {
      route = route.firstChild;
    }
    return route.snapshot.data;
  }
}
