import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { CartComponent } from './categories/components/cart/cart.component';
import { AuthGuard } from '../auth/auth-guard.guard';
const childRoutes = [
  { path: "", loadChildren: () => import("./products/products.module").then(m => m.ProductsModule) },
  { path: "categories", loadChildren: () => import("./categories/categories.module").then(m => m.CategoriesModule) },
  { path: "carts", component: CartComponent, canActivate: [AuthGuard] }

]
const routes: Routes = [
  { path: "", component: LayoutComponent, children: childRoutes },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
