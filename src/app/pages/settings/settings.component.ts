import { Component, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ThemeService } from "../../core/services/theme.service";
import type { ThemeMode } from "../../core/models/theme.model";

@Component({
  selector: "app-settings",
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="settings-container">
      <div class="settings-content">
        <div class="settings-section">
          <h2>Appearance</h2>

          <div class="setting-item">
            <div class="setting-label">
              <label class="setting-title">Theme</label>
              <span class="setting-description"
                >Choose your preferred color scheme</span
              >
            </div>
            <div class="theme-selector">
              <div
                class="theme-card"
                [class.active]="selectedTheme === 'light'"
                (click)="setTheme('light')"
              >
                <i class="pi pi-sun"></i>
                <span>Light</span>
              </div>
              <div
                class="theme-card"
                [class.active]="selectedTheme === 'dark'"
                (click)="setTheme('dark')"
              >
                <i class="pi pi-moon"></i>
                <span>Dark</span>
              </div>
              <div
                class="theme-card"
                [class.active]="selectedTheme === 'system'"
                (click)="setTheme('system')"
              >
                <i class="pi pi-desktop"></i>
                <span>System</span>
              </div>
            </div>
            @if (selectedTheme === 'system') {
            <div class="setting-helper">
              Using system preference:
              <strong>{{ themeService.currentTheme().effectiveTheme }}</strong>
            </div>
            }
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .settings-container {
        padding: 2rem;
        max-width: 1200px;
        margin: 0 auto;
      }

      .settings-content {
        display: flex;
        flex-direction: column;
        gap: 2rem;
      }

      .settings-section {
        background-color: var(--surface-card);
        border: 1px solid var(--surface-border);
        border-radius: 0.5rem;
        padding: 1.5rem;
      }

      .settings-section h2 {
        font-size: 1.25rem;
        font-weight: 600;
        margin-bottom: 1.5rem;
        color: var(--text-color);
      }

      .setting-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 2rem;
      }

      .setting-label {
        flex: 1;
      }

      .setting-title {
        display: block;
        font-size: 0.9375rem;
        font-weight: 600;
        color: var(--text-color);
        margin-bottom: 0.25rem;
      }

      .setting-description {
        display: block;
        font-size: 0.875rem;
        color: var(--text-color-secondary);
      }

      .theme-selector {
        display: flex;
        gap: 1rem;
        flex-shrink: 0;
      }

      .theme-card {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        gap: 0.5rem;
        padding: 1rem 1.5rem;
        min-width: 100px;
        background: var(--surface-card);
        border: 2px solid var(--surface-border);
        border-radius: 0.5rem;
        cursor: pointer;
        transition: all 0.2s ease;
        user-select: none;
      }

      .theme-card:hover {
        border-color: var(--primary-color);
        background: var(--surface-hover);
      }

      .theme-card.active {
        border-color: var(--primary-color);
        background: var(--primary-color);
        color: white;
      }

      .theme-card i {
        font-size: 1.5rem;
      }

      .theme-card span {
        font-size: 0.875rem;
        font-weight: 500;
      }

      @media (max-width: 768px) {
        .settings-container {
          padding: 1rem;
        }

        .setting-item {
          flex-direction: column;
          align-items: flex-start;
          gap: 1rem;
        }

        .theme-selector {
          width: 100%;
          flex-wrap: wrap;
        }

        .theme-card {
          flex: 1;
          min-width: 90px;
        }
      }
      .setting-helper {
        margin-top: 0.75rem;
        font-size: 0.875rem;
        color: var(--text-color-secondary);
      }
    `,
  ],
})
export class SettingsComponent {
  themeService = inject(ThemeService);

  selectedTheme: ThemeMode = this.themeService.currentTheme().mode;

  setTheme(theme: ThemeMode): void {
    this.selectedTheme = theme;
    this.themeService.setTheme(theme);
  }
}
