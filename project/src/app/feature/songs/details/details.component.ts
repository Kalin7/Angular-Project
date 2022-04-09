import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IRecord, SongRecordService } from 'src/app/service/song-record.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  recordById?: IRecord;
  recordId?: string;
  details: boolean = false;
  ctr?: number;
  isVoted: boolean = false;
  constructor(
    private sRecord: SongRecordService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.recordId = this.route.snapshot.params['id'];
    this.getRecord();
  }

  getRecord() {
    this.sRecord
        .getRecordById(this.recordId!)
        .subscribe({
          next: (res) => {
            this.recordById = res;
            
          },
          error: (err) => {
            alert(err.message)
          }
    })
  }

  onVote(event: Event) {
    const vote = event.target as HTMLElement;
    if (vote.tagName == 'BUTTON') {
      if (this.isVoted) {
        alert('You are already vote for this song');
        return;
      }
      this.sRecord.voteForRecordById(this.recordId!, vote.id).subscribe(() => {
        this.getRecord();
        this.isVoted = true;
      });
    }
  }

  showDetails() {
    this.details = !this.details;
  }

  onBack() {
    this.router.navigate(['/feature/song-records'])
  }
}
