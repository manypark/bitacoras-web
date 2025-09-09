import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector    : 'app-register',
  imports     : [RouterLink],
  templateUrl : './register.component.html',
  styleUrl    : './register.component.css',
})
export default class RegisterComponent {

  showPassword = false;

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

}