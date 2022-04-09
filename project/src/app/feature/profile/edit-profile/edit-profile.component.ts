import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LocalStorageService } from 'src/app/service/local-storage.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {

  editForm = new FormGroup({
    imgUrl: new FormControl(null),
    phone: new FormControl(null, Validators.required),
    about: new FormControl(null, [Validators.required, Validators.minLength(10)])
  });

  acceptedTypes: string[] = ['image/png', 'image/jpeg', 'image/jpg'];
  correctImage: boolean = true;
  fileImg!: File;

  currentUserId?: string;
  userId?: string;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private sUser: UserService,
    private sStorage: LocalStorageService
  ) { }

  ngOnInit(): void {
    this.currentUserId = this.sStorage.getUserId();
    this.userId = this.route.snapshot.parent?.params['id'];

    if (this.currentUserId !== this.userId) {
      alert('You are not authorized for this action');
      this.router.navigate(['/auth/login'])
    }
  }

  uploadImg(event: any): void {
    this.fileImg = event.target.files[0]
    
    if (!this.acceptedTypes.includes(this.fileImg.type)) {
      this.correctImage = !this.correctImage;
    }else {
      this.correctImage = true;
    }
  }

  getFormData() {
    const form = new FormData();
    form.append('image', this.fileImg)
    form.append('phone', this.editForm.get('phone')?.value);
    form.append('about', this.editForm.get('about')?.value);

    return form;
  }

  onSubmit() {
    if(!this.editForm.valid) { 
      return;
    }
    const data = this.getFormData()
    this.sUser
        .updateUserInfo(this.userId!, data)
        .subscribe({
          next: (res) => {
            
          },
          error: (err) => {
            alert(err.message)
          }
        })
    this.editForm.reset();
  }

}
