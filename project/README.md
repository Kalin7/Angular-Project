# Project

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.2.5.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

## Description:
Single Page Applcation for sharing an non-professional author's music and articles

## Third parties
for songs records ANGULAR FIREBASE 
for images AWS S3 BUCKET - throught SERVER SIDE

## Authorization:
Users must register and log in to access all the features of the application
Non register and not loggedin users have this view of the navigation bar: https://angular-project-image-storage.s3.eu-central-1.amazonaws.com/nav1.png
Registered or Logged in users have this view of the nav bar: https://angular-project-image-storage.s3.eu-central-1.amazonaws.com/Screenshot+(5).png
Clicking to Register: Registration form should load to your screen, All FIELDS ARE REQUIRED, if input is invalid submit button is DISABLED
Clicking to Login: Login form should load to your screen, All FIELDS ARE REQUIRED, if input is invalid submit button is DISABLED

## Content and view of project

Home Page - visible for all users, contains limited number of Songs and Articles loaded from Server , page doesent contain any router links for navigation use NAVIGATION BAR 
View of page is something like this:  
https://angular-project-image-storage.s3.eu-central-1.amazonaws.com/Screenshot+(6).png

Songs-record page and Blog page is visible for non logeddin and not registerd users
If user have a wish to create a blog article, a post or upload a song record he must log in

Blog page : https://angular-project-image-storage.s3.eu-central-1.amazonaws.com/Screenshot+(8).png

For upload song record articles or post, fill the form All FIELDS ARE REQUIRED
To update or delete some of your songs , articles or post visit My profile page - When you delete an item, it is saved in the database, but can no longer be accessed through the application
