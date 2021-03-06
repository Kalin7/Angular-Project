import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AngularFireStorage } from '@angular/fire/compat/storage'
import { SongRecordService } from '../../../service/song-record.service';
import { LocalStorageService } from '../../../service/local-storage.service';
import { Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-create-record',
  templateUrl: './create-record.component.html',
  styleUrls: ['./create-record.component.css']
})

export class CreateRecordComponent implements OnInit {

  recordForm = new FormGroup({
    title: new FormControl(null, Validators.required),
    genre: new FormControl(null, Validators.required),
    description: new FormControl(null, Validators.required),
    file: new FormControl(null),  
  })

  selectedFile?: File;
  filePath?: string;
  fileUrl!: any;
  userId?: string;
  correctType: boolean = true;
  recordData: {} = {};
  constructor(
    private router: Router,
    private sUser: UserService,
    private sRecord: SongRecordService, 
    private sSession: LocalStorageService,
    private storage: AngularFireStorage
  ) { }

  ngOnInit(): void {
    this.userId = this.sSession.getUserId();
  }

  upload(event: any) {
    this.selectedFile = event.target.files[0]
  }

  onCreate() {
    if (!this.recordForm.valid) {
      return;
    }
    this.filePath = `${this.selectedFile?.name}_${Math.random() * 11111111 | 0}`;
    const fileRef = this.storage.ref(this.filePath);
    
    this.storage.upload(this.filePath, this.selectedFile).then(() => {
      fileRef.getDownloadURL().subscribe((url) => {
          this.recordData = {
            title: this.recordForm.get('title')?.value,
            genre: this.recordForm.get('genre')?.value,
            description: this.recordForm.get('description')?.value,
            songUrl: url,
            author: this.userId
          }
        
          this.sRecord.createRecord(this.recordData).subscribe({
            next: (res) => {
              const addData = {
                dataType: 'song',
                id: res._id
              }
              this.sUser.updateUserData(this.userId!, addData).subscribe();
            },
            error: (err) => {
              alert(err.message)
            }
          })
          
        });
    })
  }
}
