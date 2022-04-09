import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { LocalStorageService } from 'src/app/service/local-storage.service';
import { IRegisterUser, UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm = new FormGroup({
    firstName: new FormControl('', [Validators.required, Validators.minLength(2)]),
    lastName: new FormControl('', [Validators.required, Validators.minLength(2)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    rePass: new FormControl('', [Validators.required, Validators.minLength(6)])
  })

  user!: IRegisterUser;
  public errorMessage? : {message: string}[];
  
  constructor(
    private sAuthService: UserService,
    private sStorage: LocalStorageService, 
    private library: FaIconLibrary,
    private router: Router
    ) {
    this.library.addIcons(
      faUserPlus,
    )
  }

  ngOnInit(): void {
  }

  get firstName() {
    return this.registerForm.get('firstName');
  }
  get lastName() {
    return this.registerForm.get('lastName');
  }

  get email() {
    return this.registerForm.get('email');
  }
  get password() {
    return this.registerForm.get('password');
  }
  get rePass() {
    return this.registerForm.get('rePass');
  }

  userData() {
    return this.user =  {
      firstName: this.firstName?.value,
      lastName: this.lastName?.value,
      email: this.email?.value,
      password: this.password?.value
    }
  }

  onRegister(): void {
    if (!this.registerForm.valid) {
      return
    }
    this.sAuthService.registerUser(this.userData()).subscribe({
      next: (res) => {
        this.sStorage.setLocalStorage(res);
      },
      error: (err) => {
        this.errorMessage = err.error;
      }
    });

    this.router.navigate(['/home']);
  }

}
