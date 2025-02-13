import {Component, Inject, signal} from '@angular/core';
import {RouterLink} from '@angular/router';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {AuthService} from '../auth.service';
import {catchError, map, of} from 'rxjs';
import {LocalStorageService} from '../local-storage.service';

@Component({
  selector: 'app-login',
  imports: [
    RouterLink,
    ReactiveFormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  providers:[
    {
      provide:'API_BASE_URL',
      useValue:'http://localhost:3000'
    }
  ]
})
export class LoginComponent {

  constructor(private  readonly authService:AuthService,@Inject('LOCAL_STORAGE') private store:LocalStorageService) {}

  login=new FormGroup({
    email:new FormControl('',[Validators.email,Validators.required]),
    password:new FormControl('',[Validators.required,Validators.maxLength(15),Validators.minLength(8)]),
  });

  isSubmit=signal(false);

  submit(){
    this.isSubmit.set(!this.isSubmit())
    if (this.login.valid){
      this.authService.login({email:this.login.get('email')?.value,password:this.login.get('password')?.value})
        .pipe(
          map(value=>value),
          catchError(err=>of(err))
        ).subscribe(
        (resul) => {
          if (resul?.access_token){
            this.store.setItem('token',JSON.stringify(resul));
          }
          if (resul.response){
            console.log(resul.response);
          }
        }
      );
      this.login.reset();
    }
    else{
      console.log("Formulaire non valide");
    }
  }
}
