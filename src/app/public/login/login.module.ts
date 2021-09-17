import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoginPageRoutingModule } from './login-routing.module';

import { LoginPage } from './login.page';

import { RegisterModalPageModule } from '../../modals/register-modal/register-modal.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoginPageRoutingModule,
    RegisterModalPageModule,
    ReactiveFormsModule
  ],
  declarations: [LoginPage]
})
export class LoginPageModule {}
