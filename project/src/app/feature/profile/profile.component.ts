import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { LocalStorageService } from 'src/app/service/local-storage.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, OnDestroy {

  user: any;
  userId?: string;
  elements?: string[];
  subscriber?: Subscription

  constructor(
    private sUser: UserService,
    private sStorage: LocalStorageService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.elements = ['article', 'song', 'post'];
    this.userId = this.sStorage.getUserId();
    const currentId = this.route.snapshot.params['id'];
    
    if (currentId == this.userId) {
      this.getUserData();
    }
  }

  getUserData() {
   
    this.subscriber = this.sUser
        .getUserById(this.userId!)
        .subscribe({
          next: (res) => {
            this.user = res;
          },
          error: (err) => {
            alert(err)
          }
        })
  }

  ngOnDestroy(): void {
    this.subscriber?.unsubscribe();
  }

}
