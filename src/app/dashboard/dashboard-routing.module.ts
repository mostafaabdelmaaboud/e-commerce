import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
const childRoutes = [
  { path: "", loadChildren: () => import("./products/products.module").then(m => m.ProductsModule) },
  { path: "users", loadChildren: () => import("./carts/carts.module").then(m => m.CartsModule) }

]


const routes: Routes = [
  { path: "", component: LayoutComponent, children: childRoutes },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
