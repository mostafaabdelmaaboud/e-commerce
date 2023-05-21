import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './components/login/login.component';
import { SharedModule } from '../shared/shared.module';
import { NgxsModule } from '@ngxs/store';
import { AuthState } from './store/state/login.state';
import { MatSelectModule } from '@angular/material/select';
import { provideClientHydration } from '@angular/platform-browser';
@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    SharedModule,
    MatSelectModule,
    NgxsModule.forFeature([AuthState])

  ],
  providers: [provideClientHydration()]
})
export class AuthModule { }
