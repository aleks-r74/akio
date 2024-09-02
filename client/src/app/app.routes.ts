import { Routes } from '@angular/router';
import { SummaryComponent } from './summary/summary.component';
import { MoneyComponent } from './money/money.component';
import { LoginComponent } from './login/login.component';
import { authGuard } from './auth.guard';

export const routes: Routes = [
    {path: "summary", canActivate: [authGuard] , component: SummaryComponent},
    {path: "transactions", canActivate: [authGuard],
        loadComponent: ()=> import('./transactions/transactions.component').then(c=>c.TransactionsComponent)},
    {path: "money", canActivate: [authGuard], component: MoneyComponent,
        children: [
            {path: '', canActivate: [authGuard], loadComponent: ()=> import('./money/money-management/money-management.component').then(c=>c.MoneyManagementComponent)},
            {path: 'logs', canActivate: [authGuard], loadComponent: ()=> import('./money/logs/logs.component').then(c=>c.LogsComponent)},
            {path: 'expenses', canActivate: [authGuard], loadComponent: ()=> import('./money/expenses/expenses.component').then(c=>c.ExpensesComponent)},
            {path: '6thcuts', canActivate: [authGuard], loadComponent: ()=> import('./money/sixth-cuts/sixth-cuts.component').then(c=>c.SixthCutsComponent)}
            
        ]
    },
    {path: "schedule", canActivate: [authGuard], loadComponent: ()=> import('./schedule/schedule.component').then(c=>c.ScheduleComponent)},
    {path: "users", canActivate: [authGuard], loadComponent: ()=> import('./users/users.component').then(c=>c.UsersComponent)},
    {path: "login", component: LoginComponent},
    {path: "**", redirectTo: "/summary"}
];
