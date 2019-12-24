import { Routes } from "@angular/router";
import { AuthGuard } from "./core/guards/auth.guard";
import { TemplateComponent } from "./template/template.component";
import { HomeComponent } from "./pages/home/home.component";
import { ProductComponent } from "./pages/product/product.component";
import { NotFoundComponent } from "./pages/not-found/not-found.component";
import { ProductListComponent } from "./pages/product-list/product-list.component";

export const ROUTER: Routes = [
  {
    path: "",
    component: TemplateComponent,
    children: [
      { path: "home", pathMatch: "full", redirectTo: "" },
      { path: "", pathMatch: "full", component: HomeComponent },
      { path: ":model", pathMatch: "full", redirectTo: ":model/unisex" },
      {
        path: ":model/:category",
        pathMatch: "full",
        redirectTo: ":model/:category/unisex"
      },
      { path: ":model/:gender", component: ProductListComponent },
      { path: ":model/:category/:gender", component: ProductListComponent },
      {
        path: ":model/:category/:gender/:product",
        component: ProductComponent
      },
      { path: "**", component: NotFoundComponent }
    ]
  }
];
