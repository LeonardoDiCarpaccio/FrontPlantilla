import { NgModule } from '@angular/core';
import { Route, RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/pages/dashboard/dashboard.component';
import { LoginComponent } from './components/pages/login/login.component';
import { ProfileComponent } from './components/pages/profile/profile.component';
import { MediaLibraryComponent } from './components/pages/media-library/media-library.component';

import { UsersComponent } from './components/pages/users/users.component';
import { LayoutComponent } from './components/shared/layout/layout.component';
import { OrderApprovedComponent } from './components/pages/order-approved/order-approved.component';
import { OrderWaitingComponent } from './components/pages/order-waiting/order-waiting.component';
import { OrderHistoryComponent } from './components/pages/order-history/order-history.component';

import { RoleGuard } from './Guards/role.guard';
import { MyorderWaitingComponent } from './components/pages/myorder-waiting/myorder-waiting.component';
import { MyorderHistoryComponent } from './components/pages/myorder-history/myorder-history.component';
const routes: Route[] = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [RoleGuard],
        data: { roles: ['client', 'admin'] },
      },
      // {
      //   path: 'order-approved',
      //   component: OrderApprovedComponent,
      //   canActivate: [RoleGuard],
      //   data: { roles: ['admin'] },
      // },
      {
        path: 'order-waiting',
        component: OrderWaitingComponent,
        canActivate: [RoleGuard],
        data: { roles: ['admin'] },
      },
      {
        path: 'order-history',
        component: OrderHistoryComponent,
        canActivate: [RoleGuard],
        data: { roles: ['admin'] },
      },
      {
        path: 'myorder-waiting',
        component: MyorderWaitingComponent,
        canActivate: [RoleGuard],
        data: { roles: ['client'] },
      },
      {
        path: 'myorder-history',
        component: MyorderHistoryComponent,
        canActivate: [RoleGuard],
        data: { roles: ['client'] },
      },
      {
        path: 'profile',
        component: ProfileComponent,
        canActivate: [RoleGuard],
        data: { roles: ['client', 'admin'] },
      },
      {
        path: 'users',
        component: UsersComponent,
        canActivate: [RoleGuard],
        data: { roles: ['admin'] },
      },
    ],
  },
  { path: 'login', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
