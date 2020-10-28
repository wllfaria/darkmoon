import { Directive, ComponentFactory, ComponentRef, Input, TemplateRef, ViewContainerRef, ComponentFactoryResolver } from '@angular/core';
import { RequestErrorComponent } from 'src/app/components/errors/request-error/request-error.component';

@Directive({
	// tslint:disable-next-line: directive-selector
	selector: '[requestError]'
})
export class RequestErrorDirective {
	errorFactory: ComponentFactory<RequestErrorComponent>;
	errorComponent: ComponentRef<RequestErrorComponent>;

	@Input()
	set requestError(error: boolean) {
		this.vcRef.clear();
		if (error) {
			this.errorComponent = this.vcRef.createComponent(this.errorFactory);
		} else {
			this.vcRef.createEmbeddedView(this.templateRef);
		}
	}

	constructor(
		private templateRef: TemplateRef<any>,
		private vcRef: ViewContainerRef,
		private componentFactoryResolver: ComponentFactoryResolver
	) {
		this.errorFactory = this.componentFactoryResolver.resolveComponentFactory(
			RequestErrorComponent
		);
	}
}
