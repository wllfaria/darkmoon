import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { environment } from 'src/environments/environment';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { PersonEffect } from './store/effects/person.effect';
import { appReducer } from './store/app.reducer';

@NgModule({
	imports: [
		CommonModule,
		StoreModule.forRoot(appReducer),
		EffectsModule.forRoot([PersonEffect]),
		StoreRouterConnectingModule.forRoot({ stateKey: 'router' }),
		!environment.production ? StoreDevtoolsModule.instrument() : []
	]
})

export class CoreModule { }
