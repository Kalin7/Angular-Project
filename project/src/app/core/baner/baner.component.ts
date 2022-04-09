import { Component, OnInit } from '@angular/core';
import { BanerService } from './baner.service';

@Component({
  selector: 'app-baner',
  templateUrl: './baner.component.html',
  styleUrls: ['./baner.component.css']
})
export class BanerComponent implements OnInit {

 
  pic: {title: string, url: string}[]= [];
  id!: number;  
  constructor(private sBaner: BanerService) { 
    this.id = 0;
  }

  ngOnInit(): void {
    this.getHero();
  }

  getHero() {
    this.pic = this.sBaner.getPictures();
  }

  prevPic () {
    this.id <= this.pic.length-1 && this.id > 0 ? this.id--: this.id = this.pic.length-1;
  }

  nextPic () {
    this.id < this.pic.length-1 && this.id >= 0 ? this.id++: this.id = 0;
  }
}
