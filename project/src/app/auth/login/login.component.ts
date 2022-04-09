import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import { LocalStorageService } from 'src/app/service/local-storage.service';
import { UserService } from 'src/app/service/user.service';


@Component({
  selector: 'app-user-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)])
  })

  private loginData?: {email: string; password: string}
  public errorMessage?: string;
  constructor(
    private router: Router,
    private sUser: UserService,
    private sStorage: LocalStorageService,
    private library: FaIconLibrary
    ) {
    this.library.addIcons(
      faLock,
    )
  }

  ngOnInit(): void {
    if (this.sStorage.getLocalStorage()) {
      this.router.navigate(['/']);
    }
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  getData() {
    this.loginData = this.loginForm.value;
    return this.loginData;
  }

  onLogin() {
    if (!this.loginForm.valid){ 
      return;
    };
    this.sUser.loginUser(this.getData()).subscribe({
      next: (res) => {
        this.sStorage.setLocalStorage(res);
      },
      error: (err) => {
        alert('Wrong email or password')
      }
    });
   
    this.router.navigate(['/'])
  }
}

