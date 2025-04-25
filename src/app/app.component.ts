import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';  // Assurez-vous d'importer RouterModule
import { LoginComponent } from './auth/login/login.component';
import { MonthlyPayListComponent } from './monthly-pay/monthly-pay-list/monthly-pay-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterModule,  // Ajoutez RouterModule ici pour utiliser les routes
    LoginComponent,
    MonthlyPayListComponent
  ],
  template: `
    <router-outlet></router-outlet>  <!-- Affichez les composants selon la route active -->
  `,
  styleUrls: ['./app.component.css']
})
export class AppComponent {}
