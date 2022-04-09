import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ArticleService } from 'src/app/service/article.service';
import { LocalStorageService } from 'src/app/service/local-storage.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-create-article',
  templateUrl: './create-article.component.html',
  styleUrls: ['./create-article.component.css']
})
export class CreateArticleComponent implements OnInit {

  articleForm = new FormGroup({
    title: new FormControl(null, [Validators.required, Validators.minLength(4)]),
    image: new FormControl(null, [Validators.required]),
    content: new FormControl(null, [Validators.required, Validators.minLength(10)])
  })
  userId: string = ''
  acceptedTypes: string[] = ['image/png', 'image/jpeg', 'image/jpg'];
  correctImage: boolean = true;
  fileImg!: File;
  constructor(
    private sUser: UserService,
    private sArticle: ArticleService,
    private sStorage: LocalStorageService
  ) { }

  ngOnInit(): void {
    this.userId = this.sStorage.getUserId();
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
    form.append('title', this.articleForm.get('title')?.value);
    form.append('content', this.articleForm.get('content')?.value);
    form.append('author', this.userId)
    return form;
  }



  onSubmit() {
    if(!this.articleForm.valid) { 
      return;
    }
    const data = this.getFormData()
    this.sArticle
        .createArticle(data)
        .subscribe({
          next: (res) => {
            const addData = {
              dataType: 'article',
              id: res._id
            }
            this.sUser.updateUserData(this.userId, addData).subscribe();
            alert('Article successfully created')
        },error:(err) => {
          alert(err.message);
        }
      }),

    this.articleForm.reset();
  }

}
