import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { MonthlyPayListComponent } from './monthly-pay/monthly-pay-list/monthly-pay-list.component';

// Définissez ici vos routes
export const appRoutes: Routes = [
  { path: '', component: LoginComponent },  // Route par défaut pour la page de connexion
  { path: 'monthly-pay', component: MonthlyPayListComponent },  // Route vers la liste des paiements
  { path: '**', redirectTo: '' }  // Rediriger vers la page de connexion pour toutes les autres routes
];
