import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth-guard.guard';

const routes: Routes = [
  {
    path: "",
    loadChildren: () => import("./dashboard/dashboard.module").then(m => m.DashboardModule),
    canActivate: [AuthGuard]
  },
  {
    path: "login",
    loadChildren: () => import("./auth/auth.module").then(m => m.AuthModule),
    canActivate: [AuthGuard]
  },
  { path: "**", redirectTo: "/login", pathMatch: "full" }

];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabledBlocking'
})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
