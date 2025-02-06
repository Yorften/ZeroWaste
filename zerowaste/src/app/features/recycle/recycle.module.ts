import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RecycleRoutingModule } from './recycle-routing.module';
import { StoreModule } from '@ngrx/store';
import * as fromCollectionRequest from './state/collection-request.reducer';
import { EffectsModule } from '@ngrx/effects';
import { CollectionRequestEffects } from './state/collection-request.effects';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RecycleRoutingModule,
    StoreModule.forFeature(fromCollectionRequest.collectionRequestsFeatureKey, fromCollectionRequest.reducer),
    EffectsModule.forFeature([CollectionRequestEffects])
  ]
})
export class RecycleModule { }
