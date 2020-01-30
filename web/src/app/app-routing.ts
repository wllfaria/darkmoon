import { Routes } from "@angular/router";
import { TemplateComponent } from "./template/template.component";
import { HomeComponent } from "./pages/home/home.component";
import { NotFoundComponent } from "./pages/not-found/not-found.component";

export const ROUTER: Routes = [
  {
    path: "",
    component: TemplateComponent,
    children: [
      { path: "", pathMatch: "full", component: HomeComponent },
      { path: "camisetas", loadChildren: './pages/shirts/shirts.module#ShirtsModule' },
    ]
  },
  {
    path: "autenticacao",
    loadChildren: "./pages/authentication/authentication.module#AuthenticationModule"
  },
  { path: "**", component: NotFoundComponent }
];
