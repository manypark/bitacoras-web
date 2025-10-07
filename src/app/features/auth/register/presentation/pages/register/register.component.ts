import { Router, RouterLink } from '@angular/router';
import { Component, effect, inject, OnInit, resource, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { 
  ToastService, 
  FormUtilsService, 
  SubmitButtonComponent, 
  PasswordInputComponent, 
  InputGenericFieldComponent, 
  firstNameVOValidator, 
  lastNameVOValidator, 
  emailVOValidator, 
  passwordVOValidator
} from '@app/shared/index';
import { RegisterPayload } from '@app/auth/register/infrastructure/dtos';
import { RegisterService } from '@app/auth/register/presentation/signals';
import { EmailVO, PasswordVO } from '@app/auth/login/domain/value-objects';
import { FirstNameVO, LastNameVO } from '@app/auth/register/domain/value-objects';

@Component({
  selector    : 'app-register',
  imports: [
    RouterLink, ReactiveFormsModule,
    PasswordInputComponent, InputGenericFieldComponent,
    SubmitButtonComponent,
],
  templateUrl : './register.component.html',
  styleUrl    : './register.component.css',
})
export default class RegisterComponent implements OnInit {

  private fb                = inject(FormBuilder);
  private registerServices  = inject(RegisterService);
  public formUtilServices   = inject(FormUtilsService);
  private toast             = inject(ToastService);
  private router            = inject(Router);
  private registerTrigger   = signal<RegisterPayload | null>(null);
  public registerForm!:FormGroup;

  registerResource = resource({
    params: () => this.registerTrigger(),
    loader: async ({ params }) => {
      if (!params) return undefined;
      return this.registerServices.register( params.firstName!, params.lastName!, params.email!, params.password!);
    },
  });
  
  constructor() {
    effect(() => {
      if ( this.registerResource.hasValue() ) {
        this.router.navigate(['/auth/login']);
        this.toast.success('Registro exitoso', 'Bienvenido!');
      }
      if ( this.registerResource.error() && this.registerForm.valid ) {
        this.toast.error('Error en el registro', 'Hubo algun error en la petición' );
      }
    });
  }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      firstName : ['', [Validators.required, firstNameVOValidator() ] ],
      lastName  : ['', [Validators.required, lastNameVOValidator() ] ],
      email     : ['', [Validators.required, emailVOValidator() ] ],
      password  : ['', [Validators.required, passwordVOValidator() ] ],
    });
  }

  onSubmit() {
    if (this.registerForm.valid) {
      const firstNameVO = new FirstNameVO(this.registerForm.value.firstName);
      const lastNameVO  = new LastNameVO(this.registerForm.value.lastName);
      const emailVO     = new EmailVO(this.registerForm.value.email);
      const passwordVO  = new PasswordVO(this.registerForm.value.password);
      this.registerTrigger.set({firstName: firstNameVO, lastName: lastNameVO, email: emailVO, password: passwordVO });
    }
  }
}