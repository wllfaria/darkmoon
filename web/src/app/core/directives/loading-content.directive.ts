import {
  Directive,
  TemplateRef,
  ViewContainerRef,
  ComponentFactoryResolver,
  ComponentFactory,
  ComponentRef,
  Input
} from "@angular/core";
import { LoaderComponent } from "src/app/components/loader/loader.component";

@Directive({
  selector: "[contentLoading]"
})
export class LoadingContentDirective {
  loadingFactory: ComponentFactory<LoaderComponent>;
  loadingComponent: ComponentRef<LoaderComponent>;

  @Input()
  set contentLoading(loading: boolean) {
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
      LoaderComponent
    );
  }
}
