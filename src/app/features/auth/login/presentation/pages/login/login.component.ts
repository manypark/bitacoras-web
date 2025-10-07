import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { Component, effect, inject, OnInit, resource, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, } from '@angular/forms';

import { EmailVO, PasswordVO } from '@app/auth/login/domain';
import { emailVOValidator, passwordVOValidator } from '@shared/validators';
import { SignInService } from '@app/auth/login/presentation/signals/signIn.service';
import { ToastService, FormUtilsService, SubmitButtonComponent, PasswordInputComponent, InputGenericFieldComponent, } from '@shared/index';

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
  private loginTrigger = signal<{ email: EmailVO; password: PasswordVO } | null>(null);

  private fb              = inject(FormBuilder);
  private signInServices  = inject(SignInService);
  public formUtilServices = inject(FormUtilsService);
  private toast           = inject(ToastService);
  private router          = inject(Router);
  
  signInResource = resource({
    params: () => ({email: this.loginTrigger()?.email, password: this.loginTrigger()?.password }),
    loader: ({ params }) => {
      return this.signInServices.signIn(params.email!, params.password!);
    },
  });

  constructor() {
    effect(() => {

      if ( this.signInResource.hasValue() ) {
        const data = this.signInResource.value();
        localStorage.setItem('token', data.data.token);
        localStorage.setItem('username', data.data.firstName + ' ' +data.data.lastName);
        localStorage.setItem('imageUrl', data.data.avatarUrl);
        this.router.navigate(['/home/dashboard']);
        this.toast.success('Login exitoso', 'Bienvenido de vuelta!');
      }

      if ( this.signInResource.error() && this.signInForm.valid ) {
        this.toast.error('Error en el inicio sesión', 'Hubo algun error en la petición' );
      }
    });
  }

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