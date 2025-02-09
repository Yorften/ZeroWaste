import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DataSeederService } from './core/services/data-seeder.service';

export function initializeApp(dataSeederService: DataSeederService) {
  return (): void => {
    dataSeederService.seedData();
  };
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    provideClientHydration(),
    {
      provide: APP_INITIALIZER,
      useFactory: initializeApp,
      deps: [DataSeederService],
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
