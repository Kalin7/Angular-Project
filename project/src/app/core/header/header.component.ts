import { Component, OnInit } from '@angular/core';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faFacebookF, faInstagram, faTwitter, faYoutube, faTiktok} from '@fortawesome/free-brands-svg-icons';
import { LocalStorageService } from 'src/app/service/local-storage.service';



@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  hasUser: boolean = false;
  userId?: any;
  constructor(
    private sStorage: LocalStorageService,
    library: FaIconLibrary
    ) { 
    library.addIcons(
      faFacebookF, 
      faInstagram, 
      faTwitter, 
      faYoutube, 
      faTiktok)
  }

  ngDoCheck() {
    const check = this.sStorage.getLocalStorage();
    if (!!check) {
      this.userId = this.sStorage.getUserId();
      this.hasUser = true;
    }else {
      this.hasUser = false;
    }
  }


  ngOnInit(): void {
  }

}