import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ROUTER } from './app-routing';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { TemplateComponent } from './template/template.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ComponentsModule } from './components/components.module';
import { PipesModule } from './pipes/pipes.module';
import { DirectivesModule } from './core/directives/directives.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ReactiveFormsModule } from '@angular/forms';
import { ShirtsComponent } from './pages/shirts/shirts.component';
import { NgxMaskModule, IConfig } from 'ngx-mask';
import { CoreModule } from './core/core.module';
import { ErrorInterceptor } from './core/interceptors/error-interceptor';

export let options: Partial<IConfig> | (() => Partial<IConfig>);

@NgModule({
	declarations: [
		AppComponent,
		HomeComponent,
		TemplateComponent,
		NotFoundComponent,
		ShirtsComponent,
	],
	imports: [
		ComponentsModule,
		HttpClientModule,
		CoreModule,
		PipesModule,
		DirectivesModule,
		FontAwesomeModule,
		ReactiveFormsModule,
		BrowserModule,
		BrowserAnimationsModule,
		RouterModule.forRoot(ROUTER, { useHash: false }),
		NgxMaskModule.forRoot(options),
	],
	providers: [
		{ provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
