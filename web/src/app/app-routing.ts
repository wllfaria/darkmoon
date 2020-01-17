import { Routes } from "@angular/router";
import { AuthGuard } from "./core/guards/auth.guard";
import { TemplateComponent } from "./template/template.component";
import { HomeComponent } from "./pages/home/home.component";
import { ProductComponent } from "./pages/product/product.component";
import { NotFoundComponent } from "./pages/not-found/not-found.component";
import { ProductListComponent } from "./pages/product-list/product-list.component";
import { LoginComponent } from './pages/login/login.component';

export const ROUTER: Routes = [
  {
    path: "",
    component: TemplateComponent,
    children: [
      { path: "home", pathMatch: "full", redirectTo: "" },
      { path: "", pathMatch: "full", component: HomeComponent },
      { path: "camisetas/unisex", pathMatch: "full", redirectTo: "camisetas" },
      { path: "camisetas", component: ProductListComponent },
      { path: "camisetas/masculino", component: ProductListComponent },
      { path: "camisetas/feminino", component: ProductListComponent },
      {
        path: "camisetas/longsleeve/unisex",
        pathMatch: "full",
        redirectTo: "camisetas/longsleeve"
      },
      { path: "camisetas/longsleeve", component: ProductListComponent },
      {
        path: "camisetas/longsleeve/masculino",
        component: ProductListComponent
      },
      {
        path: "camisetas/longsleeve/feminino",
        component: ProductListComponent
      },
      {
        path: "camisetas/longsleeve/unisex/:product",
        component: ProductComponent
      },
      {
        path: "camisetas/longsleeve/feminino/:product",
        component: ProductComponent
      },
      {
        path: "camisetas/longsleeve/masculino/:product",
        component: ProductComponent
      },
    ]
  },
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: "registro",
    component: LoginComponent
  },
  {
    path: "recuperar-senha",
    component: LoginComponent
  },
  { path: "**", component: NotFoundComponent }
];
