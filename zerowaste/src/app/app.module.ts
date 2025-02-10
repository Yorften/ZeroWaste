import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { DataSeederService } from './core/services/data-seeder.service';
import * as fromAuth from './features/auth/state/auth.reducer';
import * as fromUser from './features/profile/state/user.reducer';

import { SharedModule } from './shared/shared.module';
import { AuthEffects } from './features/auth/state/auth.effects';
import { UserEffects } from './features/profile/state/user.effects';

export function initializeApp(dataSeederService: DataSeederService) {
  return (): void => {
    dataSeederService.seedData();
  };
}

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    SharedModule,
    BrowserModule,
    StoreModule.forRoot({}, {}),
    EffectsModule.forRoot([]),
    StoreModule.forFeature(fromAuth.authFeatureKey, fromAuth.reducer),
    EffectsModule.forFeature([AuthEffects]),
    StoreModule.forFeature(fromUser.userFeatureKey, fromUser.reducer),
    EffectsModule.forFeature([UserEffects]),
    AppRoutingModule,
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
