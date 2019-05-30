import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { TabsPage } from "./tabs.page";
import { AuthGuard } from "../guards/auth.guard";

const routes: Routes = [
  {
    path: "tabs",
    component: TabsPage,
    children: [
      {
        path: "tab1",
        children: [
          {
            path: "",
            loadChildren: "../tab1/tab1.module#Tab1PageModule",
            canActivate: [AuthGuard]
          }
        ]
      },
      {
        path: "tab2",
        children: [
          {
            path: "",
            loadChildren: "../tab2/tab2.module#Tab2PageModule",
            canActivate: [AuthGuard]
          }
        ]
      },
      {
        path: "tab3",
        children: [
          {
            path: "",
            loadChildren: "../tab3/tab3.module#Tab3PageModule",
            canActivate: [AuthGuard]
          }
        ]
      },
      {
        path: "dashboard",
        children: [
          {
            path: "",
            loadChildren:
              "../members/dashboard/dashboard.module#DashboardPageModule",
            canActivate: [AuthGuard]
          }
        ]
      },
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule { }
