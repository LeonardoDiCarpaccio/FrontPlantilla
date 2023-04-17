import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationComponent } from './components/shared/navigation/navigation.component';
import { MediaLibraryComponent } from './components/pages/media-library/media-library.component';
import { UsersComponent } from './components/pages/users/users.component';
import { DashboardComponent } from './components/pages/dashboard/dashboard.component';
import { LoginComponent } from './components/pages/login/login.component';
import { ProfileComponent } from './components/pages/profile/profile.component';
import { LayoutComponent } from './components/shared/layout/layout.component';
import { SimpleModalModule } from 'ngx-simple-modal';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PersonUpdateModalComponent } from './components/shared/modal/person-update-modal/person-update-modal.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastComponent } from './components/shared/toast/toast.component';
import { GenericTableComponent } from './components/genericComponent/generic-table/generic-table.component';
import { GenericModalInsertComponent } from './components/genericComponent/generic-modal-insert/generic-modal-insert.component';
import { OrderWaitingComponent } from './components/pages/order-waiting/order-waiting.component';
import { OrderApprovedComponent } from './components/pages/order-approved/order-approved.component';
import { OrderHistoryComponent } from './components/pages/order-history/order-history.component';
import { GenericTableOrderComponent } from './components/genericComponent/generic-table-order/generic-table-order.component';
import { GenericStepsFormComponent } from './components/genericComponent/generic-steps-form/generic-steps-form.component';
import { GenericFormgroupComponent } from './components/genericComponent/generic-formgroup/generic-formgroup.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { GenericOrderDetailsCardComponent } from './components/genericComponent/generic-order-details-card/generic-order-details-card.component';
import { AuthInterceptor } from './services/authInterceptor';
import { MyorderWaitingComponent } from './components/pages/myorder-waiting/myorder-waiting.component';
import { MyorderHistoryComponent } from './components/pages/myorder-history/myorder-history.component';
import { GenericTableMyorderComponent } from './components/genericComponent/generic-table-myorder/generic-table-myorder.component';
// import { MyorderWaitingComponent } from './components/pages/myorder-waiting/myorder-waiting.component';
// import { MyorderHistoryComponent } from './components/pages/myorder-history/myorder-history.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    MediaLibraryComponent,
    UsersComponent,
    DashboardComponent,
    LoginComponent,
    ProfileComponent,
    LayoutComponent,
    PersonUpdateModalComponent,
    ToastComponent,
    GenericTableComponent,
    GenericModalInsertComponent,
    OrderWaitingComponent,
    OrderApprovedComponent,
    OrderHistoryComponent,
    GenericTableOrderComponent,
    GenericStepsFormComponent,
    GenericFormgroupComponent,
    GenericOrderDetailsCardComponent,
    MyorderWaitingComponent,
    MyorderHistoryComponent,
    GenericTableMyorderComponent,
    // MyorderWaitingComponent,
    // MyorderHistoryComponent,
  ],

  imports: [
    CommonModule,
    HttpClientModule,
    BrowserModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    SimpleModalModule,
    FormsModule,

    Ng2SearchPipeModule,
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right',
      toastComponent: ToastComponent,
    }),
  ],
  entryComponents: [
    ToastComponent,
    PersonUpdateModalComponent,
    GenericModalInsertComponent,
  ],

  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
