import { Router, RouterLink } from '@angular/router';
import { Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { ToastService } from '@app/shared/toast';
import { FormUtilsService } from '@app/shared/services';
import { SubmitButtonComponent } from '@app/shared/buttons';
import { EmailVO, PasswordVO } from '@app/auth/login/domain/value-objects';
import { SignInService } from '@app/auth/login/presentation/signals/signIn.service';
import { FirstNameVO, LastNameVO } from '@app/auth/register/domain/value-objects';
import { PasswordInputComponent, InputGenericFieldComponent } from '@app/shared/inputs';
import { firstNameVOValidator, lastNameVOValidator, emailVOValidator, passwordVOValidator } from '@app/shared/validators';

export interface RegisterPayload {
  firstName : FirstNameVO;
  lastName  : LastNameVO;
  email     : EmailVO;
  password  : PasswordVO;
}

@Component({
  selector    : 'app-register',
  imports: [
    RouterLink,
    ReactiveFormsModule,
    PasswordInputComponent,
    InputGenericFieldComponent,
    SubmitButtonComponent
],
  templateUrl : './register.component.html',
  styleUrl    : './register.component.css',
})
export default class RegisterComponent implements OnInit {

  registerForm!:FormGroup;
  
  private registerTrigger = signal<RegisterPayload | null>(null);

  private fb              = inject(FormBuilder);
  private signInServices  = inject(SignInService);
  public formUtilServices = inject(FormUtilsService);
  private toast           = inject(ToastService);
  private router          = inject(Router);

  ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    this.registerForm = this.fb.group({
      firstName : ['', [Validators.required, firstNameVOValidator() ] ],
      lastName  : ['', [Validators.required, lastNameVOValidator() ] ],
      email     : ['', [Validators.required, emailVOValidator() ] ],
      password  : ['', [Validators.required, passwordVOValidator() ] ],
    });
  }

  onSubmit() {

  }

}