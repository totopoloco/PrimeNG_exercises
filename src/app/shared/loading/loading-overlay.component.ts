import { Component, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { LoadingService } from "../../core/services/loading.service";

@Component({
  selector: "app-loading-overlay",
  standalone: true,
  imports: [CommonModule],
  template: `
    @if (loading.isLoading()) {
    <div class="loading-overlay" aria-live="polite" aria-busy="true">
      <div class="loading-card" role="status">
        <i class="pi pi-spinner pi-spin spinner-icon" aria-hidden="true"></i>
        <span class="text">Loading...</span>
      </div>
    </div>
    }
  `,
  styles: [
    `
      .loading-overlay {
        position: fixed;
        inset: 0;
        display: grid;
        place-items: center;
        background: color-mix(in oklab, var(--surface-ground), transparent 40%);
        backdrop-filter: blur(2px);
        z-index: 10000;
      }

      .loading-card {
        display: inline-flex;
        align-items: center;
        gap: 0.5rem;
        background: var(--surface-card);
        color: var(--text-color);
        border: 1px solid var(--surface-border);
        border-radius: 0.75rem;
        padding: 0.5rem 0.75rem;
        box-shadow: 0 6px 18px rgba(0, 0, 0, 0.15);
        width: max-content;
        justify-self: center;
        align-self: center;
      }

      .text {
        font-size: 0.875rem;
      }
      /* Spinner icon styling (PrimeIcons) */
      .spinner-icon {
        font-size: 1rem;
        line-height: 1;
        color: var(--primary-color);
        display: inline-block;
        /* Fallback spin in case pi-spin class isn't applied */
        animation: fallback-rotate 1s linear infinite;
      }
      @keyframes fallback-rotate {
        from {
          transform: rotate(0deg);
        }
        to {
          transform: rotate(360deg);
        }
      }
    `,
  ],
})
export class LoadingOverlayComponent {
  loading = inject(LoadingService);
}
