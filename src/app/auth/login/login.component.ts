import { Component } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';  // Importez ReactiveFormsModule
import { AuthService } from '../auth.service';  // Assurez-vous que ce service est bien importé
import { Router } from '@angular/router';  // Importez Router pour la redirection
import { jqxButtonModule } from 'jqwidgets-ng/jqxbuttons';  // Importez les modules jqwidgets nécessaires
import { jqxInputModule } from 'jqwidgets-ng/jqxinput';  // Importez jqxInputModule
import { jqxPasswordInputModule } from 'jqwidgets-ng/jqxpasswordinput';  // Importez jqxPasswordInputModule
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,  // Définir le composant comme autonome
  imports: [
    CommonModule,
    ReactiveFormsModule,  // Ajoutez ReactiveFormsModule ici
    jqxButtonModule,
    jqxInputModule,
    jqxPasswordInputModule,
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]  // Ajoutez CUSTOM_ELEMENTS_SCHEMA ici
})
export class LoginComponent {
  loginForm;

  constructor(
    private fb: FormBuilder,  // FormBuilder est injecté ici dans le constructeur
    private authService: AuthService,  // AuthService pour l'authentification
    private router: Router  // Router pour la redirection après connexion
  ) {
    // Initialise le formulaire ici
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;

      // Vérifier que username et password sont des chaînes valides (non nulles, non undefined)
      if (username && password) {
        console.log("1111");
        this.authService.login(username, password).subscribe({
          next: () => {
            // Si la connexion est réussie, rediriger vers une autre page
            this.router.navigate(['/monthly-pay']);  // Redirection vers la page des paiements mensuels (par exemple)
          },
          error: (err) => {
            // Gérer les erreurs, comme une connexion incorrecte
            console.error(err);
            alert('Nom d\'utilisateur ou mot de passe incorrect');
          }
        });
      } else {
        alert('Nom d\'utilisateur et mot de passe sont requis');
      }
    }
  }
}
