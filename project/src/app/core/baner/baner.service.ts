import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})


export class BanerService {

    pictures: {title: string, url: string}[] = [];

    constructor() {
        this.pictures = [
            {
                title: 'Do you want to go to a concert? Buy a ticket from us',
                url: '../../../assets/images/concerts.jpg'
            },
            {
                title: 'Buy a BEST musical instruments of low prices',
                url: '../../../assets/images/instruments.png'
            },
            {
                title: 'Free lessons for BEGINNERS',
                url: '../../../assets/images/lessons.png'
            },
        ]
    }

    getPictures() {
        return this.pictures
    }
}