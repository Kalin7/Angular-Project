import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faPlayCircle, faThumbsUp, faThumbsDown} from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { LocalStorageService } from 'src/app/service/local-storage.service';
import { IRecord, SongRecordService } from '../../service/song-record.service'

@Component({
  selector: 'app-songs',
  templateUrl: './songs.component.html',
  styleUrls: ['./songs.component.css']
})
export class SongsComponent implements OnInit, OnDestroy {

  records?: IRecord[] = [];
  loaded: boolean = false;
  subscriber?: Subscription

  constructor(
    private sRecord: SongRecordService,
    private sStorage: LocalStorageService,
    private router: Router,
    private route: ActivatedRoute,
    private library: FaIconLibrary
    ) {
      this.library.addIcons(
        faPlayCircle,
        faThumbsUp,
        faThumbsDown
      )
    }

  ngOnInit(): void {
    this.getRecords();
  }

  getRecords() {
    this.subscriber = this.sRecord
        .getAllRecords()
        .subscribe({
          next: (res) => {
            this.records = res
          },
          error: (err) => {
            alert(err.message)
          }
    })
  }

  ngOnDestroy() {
    this.subscriber?.unsubscribe();
  }


}
