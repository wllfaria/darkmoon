import {
  Directive,
  ComponentFactory,
  ComponentRef,
  ViewContainerRef,
  TemplateRef,
  ComponentFactoryResolver,
  Input
} from "@angular/core";
import { CartLoaderComponent } from "src/app/components/loaders/cart-loader/cart-loader.component";

@Directive({
  selector: "[cartLoading]"
})
export class LoadingCartDirective {
  loadingFactory: ComponentFactory<CartLoaderComponent>;
  loadingComponent: ComponentRef<CartLoaderComponent>;

  @Input()
  set cartLoading(loading: boolean) {
    this.vcRef.clear();
    if (loading) {
      this.loadingComponent = this.vcRef.createComponent(this.loadingFactory);
    } else {
      this.vcRef.createEmbeddedView(this.templateRef);
    }
  }

  constructor(
    private templateRef: TemplateRef<any>,
    private vcRef: ViewContainerRef,
    private componentFactoryResolver: ComponentFactoryResolver
  ) {
    this.loadingFactory = this.componentFactoryResolver.resolveComponentFactory(
      CartLoaderComponent
    );
  }
}
