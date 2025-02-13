import {Component, signal} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {RouterLink} from "@angular/router";
import {CheckPasswordDirective} from '../../check-password.directive';
import {AuthService} from '../auth.service';
import {catchError, map, of} from 'rxjs';

@Component({
  selector: 'app-register',
  imports: [
    ReactiveFormsModule,
    RouterLink,
    CheckPasswordDirective
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
  providers:[]
})
export class RegisterComponent {

  constructor(private  readonly authService:AuthService) {
  }

  register=new FormGroup({
    email:new FormControl('',[Validators.email,Validators.required]),
    password:new FormControl('',[Validators.required,Validators.maxLength(15),Validators.minLength(8)]),
    confirm_password:new FormControl('',[Validators.required,Validators.maxLength(15),Validators.minLength(8)]),
  });


  isSubmit=signal(false);

  submit(){
    this.isSubmit.set(!this.isSubmit())
    if (this.register.valid){
      this.authService.register({email:this.register.get('email')?.value,password:this.register.get('password')?.value})
        .pipe(
          map(value=>value),
          catchError(err=>of(err))
        ).subscribe(
        (resul) => {
          if (resul){
            console.log('success');
          }
          if (resul.response){
            console.log(resul.response);
          }
        }
      );
      this.register.reset();
    }
    else{
      console.log("Formulaire non valide");
    }
  }
}
