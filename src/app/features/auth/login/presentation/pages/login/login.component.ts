import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, resource, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, } from '@angular/forms';

import { SignInService } from '../../signals/signIn.service';
import { EmailVO, PasswordVO } from '../../../domain/value-objects';
import { emailVOValidator, passwordVOValidator } from '../../validators/validators';
import { 
  FormUtilsService, 
  SubmitButtonComponent, 
  InputGenericFieldComponent, 
  PasswordInputComponent
} from '../../../../../shared/shared';

@Component({
  selector    : 'app-login',
  imports: [
    RouterLink,
    ReactiveFormsModule,
    CommonModule,
    SubmitButtonComponent,
    InputGenericFieldComponent,
    PasswordInputComponent
],
  templateUrl : './login.component.html',
  styleUrl    : './login.component.css',
})
export default class LoginComponent implements OnInit {

  signInForm!:FormGroup;
  showPassword = false;
  private fb = inject(FormBuilder);
  private signInServices = inject(SignInService);
  public formUtilServices = inject(FormUtilsService);
  private loginTrigger = signal<{ email: EmailVO; password: PasswordVO } | null>(null);
  
  signInResource = resource({
    params: () => ({email: this.loginTrigger()?.email, password: this.loginTrigger()?.password }),
    loader: ({ params }) => {
      return this.signInServices.signIn(params.email!, params.password!);
    },
  });

  ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    this.signInForm = this.fb.group({
      email     : ['', [Validators.required, emailVOValidator()] ],
      password  : ['', [Validators.required, passwordVOValidator()] ],
    });
  }

  onSubmit() {
    if (this.signInForm.valid) {
      const emailVO     = new EmailVO(this.signInForm.value.email);
      const passwordVO  = new PasswordVO(this.signInForm.value.password);
      this.loginTrigger.set({ email: emailVO, password: passwordVO });
    }
  }

}