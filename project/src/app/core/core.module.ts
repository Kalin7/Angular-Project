import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome'
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { BanerComponent } from './baner/baner.component';
import { HomeComponent } from './home/home.component';
import { AppRoutingModule } from '../app-routing.module';


@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    BanerComponent,
    HomeComponent,
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    AppRoutingModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    BanerComponent,
    HomeComponent
  ]
})
export class CoreModule { }
