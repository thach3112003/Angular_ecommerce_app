import { GuardsCheckEnd, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthGuard } from './guard/auth.guard';


export const routes: Routes = [
    {path:'login', component: LoginComponent, canActivate:[AuthGuard]},
    { path: 'register', component: RegisterComponent, canActivate:[AuthGuard] }
];
