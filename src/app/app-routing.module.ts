import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './services/auth.guard';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule),
    canActivate: [AuthGuard]
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./public/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'register-modal',
    loadChildren: () => import('./modals/register-modal/register-modal.module').then( m => m.RegisterModalPageModule)
  },
  {
    path: 'notes-modal',
    loadChildren: () => import('./modals/notes-modal/notes-modal.module').then( m => m.NotesModalPageModule)
  },
  {
    path: 'mini-menu',
    loadChildren: () => import('./mini-menu/mini-menu.module').then( m => m.MiniMenuPageModule)
  },
  {
    path: 'select-project-menu',
    loadChildren: () => import('./select-project-menu/select-project-menu.module').then( m => m.SelectProjectMenuPageModule)
  },
  {
    path: 'projects-modal',
    loadChildren: () => import('./modals/projects-modal/projects-modal.module').then( m => m.ProjectsModalPageModule)
  },
  {
    path: 'users-project-modal',
    loadChildren: () => import('./modals/users-project-modal/users-project-modal.module').then( m => m.UsersProjectModalPageModule)
  },
  {
    path: 'comentarios-nota-modal',
    loadChildren: () => import('./modals/comentarios-nota-modal/comentarios-nota-modal.module').then( m => m.ComentariosNotaModalPageModule)
  },
  {
    path: 'asssign-user-modal',
    loadChildren: () => import('./modals/asssign-user-modal/asssign-user-modal.module').then( m => m.AsssignUserModalPageModule)
  },  {
    path: 'task-files-modal',
    loadChildren: () => import('./modals/task-files-modal/task-files-modal.module').then( m => m.TaskFilesModalPageModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
