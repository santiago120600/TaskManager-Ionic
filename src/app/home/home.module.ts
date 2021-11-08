import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';

import { NotesModalPageModule } from '../modals/notes-modal/notes-modal.module';
import { UsersProjectModalPageModule } from '../modals/users-project-modal/users-project-modal.module';
import { DragDropModule } from '@angular/cdk/drag-drop';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    NotesModalPageModule,
    ReactiveFormsModule,
    DragDropModule, UsersProjectModalPageModule
  ],
  declarations: [HomePage]
})
export class HomePageModule {}
