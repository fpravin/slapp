import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "./guards/auth.guard";

const routes: Routes = [
  { path: "", redirectTo: "page", pathMatch: "full" },
  {
    path: "login",
    loadChildren: "./public/login/login.module#LoginPageModule"
  },
  {
    path: "register",
    loadChildren: "./public/register/register.module#RegisterPageModule"
  },
  {
    path: "members",
    loadChildren: "./members/member-routing.module#MemberRoutingModule"
  },
  {
    path: "page",
    // canActivate: [AuthGuard],
    loadChildren: "./tabs/tabs.module#TabsPageModule"
  },
  {
    path: "dashboard",
    loadChildren: "./members/dashboard/dashboard.module#DashboardPageModule"
    // canActivate: [AuthGuard],
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
