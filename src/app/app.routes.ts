import { Routes } from '@angular/router';
import { LoginComponent } from './public/pages/login/login.component';
import { authGuardGuard } from './guards/auth-guard.guard';
import { RegisterComponent } from './public/pages/register/register.component';
import { roleSellerGuard } from './guards/roleSeller.guard';
import { roleEmployeeGuard } from './guards/role-employee.guard';


export const routes: Routes = [
    {path:'login', component: LoginComponent},
    {path:'register', component: RegisterComponent},
    {path:'dashboard',loadComponent: () => import('./private/pages/dashboard/dashboard.component').then(mod => mod.DashboardComponent),canActivate: [authGuardGuard] ,children:
    [
    
    {
        path:'', loadChildren: () => import('./private/user/Routes').then(mod => mod.EMPLOYEE_ROUTES),canActivateChild:[roleEmployeeGuard]
        
    },
    {
        path:'', loadChildren: () => import('./private/seller/Routes').then(mod => mod.SELLER_ROUTES),canActivateChild:[roleSellerGuard]
    }
    ]},
    {path:'', component: LoginComponent},
    {path:'**', component: LoginComponent}
];