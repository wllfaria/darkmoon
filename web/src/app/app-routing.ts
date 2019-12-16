import { Routes } from "@angular/router";
import { AuthGuard } from "./core/guards/auth.guard";
import { TemplateComponent } from "./template/template.component";
import { HomeComponent } from "./pages/home/home.component";
import { ProductComponent } from "./pages/product/product.component";
import { NotFoundComponent } from "./pages/not-found/not-found.component";

export const ROUTER: Routes = [
  {
    path: "",
    component: TemplateComponent,
    children: [
      { path: "", pathMatch: "full", component: HomeComponent },
      { path: ":categoria/:genero/:produto", component: ProductComponent },
      { path: "**", component: NotFoundComponent }
    ]
  }
];
