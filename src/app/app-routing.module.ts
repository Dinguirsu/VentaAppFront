import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClienteComponent } from './cliente/cliente.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './Security/auth.guard';
import { LoginComponent } from './Login/login.component';

const routes: Routes = [
  { path: '', redirectTo: '/Home', pathMatch:'full'},
  {path: 'Home', component: HomeComponent, canActivate: [AuthGuard]},
  { path: 'Cliente', component: ClienteComponent, canActivate: [AuthGuard]},
  { path: 'Login', component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
