import { Component } from '@angular/core';

@Component({
  selector    : 'app-login',
  imports     : [],
  templateUrl : './login.component.html',
  styleUrl    : './login.component.css',
})
export default class LoginComponent {

  inputType: string = 'password';

  togglePassword(): void {
    this.inputType = this.inputType === 'password' ? 'text' : 'password';
  }

}
