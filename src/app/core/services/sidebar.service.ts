import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  private readonly STORAGE_KEY = 'app-sidebar-collapsed';

  private collapsedState = signal<boolean>(this.getStoredState());

  readonly isCollapsed = this.collapsedState.asReadonly();

  toggle(): void {
    const newState = !this.collapsedState();
    this.collapsedState.set(newState);
    localStorage.setItem(this.STORAGE_KEY, String(newState));
  }

  setCollapsed(collapsed: boolean): void {
    this.collapsedState.set(collapsed);
    localStorage.setItem(this.STORAGE_KEY, String(collapsed));
  }

  private getStoredState(): boolean {
    const stored = localStorage.getItem(this.STORAGE_KEY);
    return stored === 'true';
  }
}
