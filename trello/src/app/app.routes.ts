import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/login/login';
import { RegisterComponent } from './features/auth/register/register';
import { DashboardComponent } from './features/dashboard/dashboard';

export const routes: Routes = [
    { path: 'login', component: LoginComponent},
    { path: 'register', component: RegisterComponent},
    { path: 'dashboard', component: DashboardComponent},
    { path: 'workspace/:id', loadComponent: () => import('./features/workspace/workspace').then(m => m.WorkspaceComponent)},
    { path: 'board/:id', loadComponent: () => import ('./features/board/board').then(m => m.BoardComponent)},
    { path: '', redirectTo: 'login', pathMatch: 'full' }
];
