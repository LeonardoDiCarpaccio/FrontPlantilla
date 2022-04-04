import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationComponent } from './components/shared/navigation/navigation.component';
import { BroadcastsComponent } from './components/pages/broadcasts/broadcasts.component';
import { PlayerComponent } from './components/pages/player/player.component';
import { MediaLibraryComponent } from './components/pages/media-library/media-library.component';
import { ScreensComponent } from './components/pages/screens/screens.component';
import { ScreenGroupsComponent } from './components/pages/screen-groups/screen-groups.component';
import { UsersComponent } from './components/pages/users/users.component';
import { DashboardComponent } from './components/pages/dashboard/dashboard.component';
import { LoginComponent } from './components/pages/login/login.component';
import { ProfileComponent } from './components/pages/profile/profile.component';
import { LayoutComponent } from './components/shared/layout/layout.component';
import { PageTitleComponent } from './components/shared/page-title/page-title.component';
import { SimpleModalModule } from 'ngx-simple-modal';
import { FormsModule } from '@angular/forms';
import { PersonUpdateModalComponent } from './components/shared/modal/person-update-modal/person-update-modal.component';
import { ScreenUpdateModalComponent } from './components/shared/modal/screen-update-modal/screen-update-modal.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastComponent } from './components/shared/toast/toast.component';
import { SvgBuilderComponent } from './components/shared/svg-builder/svg-builder.component';
import { GroupScreenUpdateModalComponent } from './components/shared/modal/group-screen-update-modal/group-screen-update-modal.component';
import { BroadcastUpdateModalComponent } from './components/shared/modal/broadcast-update-modal/broadcast-update-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    BroadcastsComponent,
    PlayerComponent,
    MediaLibraryComponent,
    ScreensComponent,
    ScreenGroupsComponent,
    UsersComponent,
    DashboardComponent,
    LoginComponent,
    ProfileComponent,
    LayoutComponent,
    PageTitleComponent,
    PersonUpdateModalComponent,
    ScreenUpdateModalComponent,
    ToastComponent,
    SvgBuilderComponent,
    GroupScreenUpdateModalComponent,
    BroadcastUpdateModalComponent,

  ],

  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    SimpleModalModule,
    FormsModule,
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right',
      toastComponent : ToastComponent
    }),
  ],
  entryComponents: [
    ToastComponent,
    PersonUpdateModalComponent,
    ScreenUpdateModalComponent
  ],

  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
