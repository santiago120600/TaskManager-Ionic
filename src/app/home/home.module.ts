import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';

import { NotesModalPageModule } from '../modals/notes-modal/notes-modal.module';
import { UsersProjectModalPageModule } from '../modals/users-project-modal/users-project-modal.module';
import { AsssignUserModalPageModule } from '../modals/asssign-user-modal/asssign-user-modal.module';
import { ComentariosNotaModalPageModule } from '../modals/comentarios-nota-modal/comentarios-nota-modal.module';
import { TaskFilesModalPageModule } from '../modals/task-files-modal/task-files-modal.module';
import { DragDropModule } from '@angular/cdk/drag-drop';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    NotesModalPageModule,
    ReactiveFormsModule,
    DragDropModule,
    UsersProjectModalPageModule,
    AsssignUserModalPageModule,
    ComentariosNotaModalPageModule,
    TaskFilesModalPageModule,
  ],
  declarations: [HomePage]
})
export class HomePageModule {}
