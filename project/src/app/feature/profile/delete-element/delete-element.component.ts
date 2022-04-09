import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LocalStorageService } from 'src/app/service/local-storage.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-delete-element',
  templateUrl: './delete-element.component.html',
  styleUrls: ['./delete-element.component.css']
})
export class DeleteElementComponent implements OnInit {

  elementId?: string;
  authorId?: string;
  currentUserId?: string;
  elementType?: string;

  constructor(
    private route: ActivatedRoute, 
    private router: Router,
    private sUser: UserService,
    private sStorage: LocalStorageService
    ) { }

  ngOnInit(): void {
    this.elementType = this.route.snapshot.url[0].path;
    this.elementId = this.route.snapshot.params['elementId'];
    this.authorId = this.route.snapshot.params['authorId'];
    this.currentUserId = this.sStorage.getUserId();
    if (this.currentUserId != this.authorId) {
      alert('You are not authorized for this action')
      this.router.navigate(['/login'])
    }else {
      this.deleteElement();
    }

    console.log(this.elementType, this.elementId, this.authorId, this.currentUserId)
  } 

  deleteElement() {
    this.sUser
        .deleteElement(this.authorId!, this.elementId!, this.elementType!)
        .subscribe({
          next: (res) => {
            console.log(res)
            alert('Element deleted successfully')
          },
          error: (err) => {
            alert(err.message)
          }
        })
    this.router.navigate([`/feature/user/${this.currentUserId}/profile`])
  }

}
