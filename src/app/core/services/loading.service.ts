import { Injectable, computed, signal } from "@angular/core";
import { Observable, finalize } from "rxjs";

@Injectable({ providedIn: "root" })
export class LoadingService {
  private readonly counters = new Map<string, number>();
  private readonly totalCount = signal(0);

  // Derived read-only signal for templates/components
  readonly isLoading = computed(() => this.totalCount() > 0);

  show(key: string = "global"): void {
    const next = (this.counters.get(key) ?? 0) + 1;
    this.counters.set(key, next);
    this.totalCount.set(this.totalCount() + 1);
  }

  hide(key: string = "global"): void {
    const curr = this.counters.get(key) ?? 0;
    if (curr <= 1) {
      this.counters.delete(key);
    } else {
      this.counters.set(key, curr - 1);
    }
    // Clamp at 0 to be safe
    const nextTotal = Math.max(0, this.totalCount() - 1);
    this.totalCount.set(nextTotal);
  }

  // Helper: wrap a Promise and show/hide while it runs
  async wrapPromise<T>(task: Promise<T>, key: string = "global"): Promise<T> {
    this.show(key);
    try {
      return await task;
    } finally {
      this.hide(key);
    }
  }

  // Helper: wrap an Observable and show/hide for its lifecycle
  trackObservable<T>(
    source: Observable<T>,
    key: string = "global"
  ): Observable<T> {
    this.show(key);
    return source.pipe(finalize(() => this.hide(key)));
  }
}
