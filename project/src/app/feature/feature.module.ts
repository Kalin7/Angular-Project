import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FeatureRoutingModule } from './feature-routing.module';
import { BlogComponent } from './blog/blog.component';
import { AppRoutingModule } from '../app-routing.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CreateArticleComponent } from './blog/create-article/create-article.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CreatePostComponent } from './blog/create-post/create-post.component';
import { SongsComponent } from './songs/songs.component';
import { CreateRecordComponent } from './songs/create-record/create-record.component';
import { DetailsComponent } from './songs/details/details.component';
import { PostsComponent } from './blog/posts/posts.component';
import { ProfileComponent } from './profile/profile.component';
import { EditProfileComponent } from './profile/edit-profile/edit-profile.component';
import { DeleteElementComponent } from './profile/delete-element/delete-element.component';


@NgModule({
  declarations: [
    BlogComponent,
    CreateArticleComponent,
    CreatePostComponent,
    SongsComponent,
    CreateRecordComponent,
    DetailsComponent,
    PostsComponent,
    ProfileComponent,
    EditProfileComponent,
    DeleteElementComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FeatureRoutingModule,
    FontAwesomeModule,
  ]
})
export class FeatureModule { }
