import { ApplicationConfig, provideZoneChangeDetection } from "@angular/core";
import { provideRouter } from "@angular/router";
import { routes } from "./app.routes";

export const appConfig: ApplicationConfig = {
  // Animations note:
  // Angular 20 deprecates the legacy animations provider APIs. This app doesn't use
  // the legacy Angular animations DSL, so we intentionally omit animations providers
  // to avoid deprecation warnings and unnecessary runtime.
  // If you later need legacy animations:
  //   - Enable them: import { provideAnimations } from "@angular/platform-browser/animations";
  //                  then add provideAnimations() below.
  //   - Or force-disable globally: import { provideNoopAnimations } from "@angular/platform-browser/animations";
  //                  then add provideNoopAnimations() below.
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
  ],
};
