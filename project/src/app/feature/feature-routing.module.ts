import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PermissionGuard } from '../guards/permission.guard';
import { BlogComponent } from './blog/blog.component';
import { CreateArticleComponent } from './blog/create-article/create-article.component';
import { CreatePostComponent } from './blog/create-post/create-post.component';
import { PostsComponent } from './blog/posts/posts.component';
import { DeleteElementComponent } from './profile/delete-element/delete-element.component';
import { EditProfileComponent } from './profile/edit-profile/edit-profile.component';
import { ProfileComponent } from './profile/profile.component';
import { CreateRecordComponent } from './songs/create-record/create-record.component';
import { DetailsComponent } from './songs/details/details.component';
import { SongsComponent } from './songs/songs.component';

const routes: Routes = [
  {
    path: 'blog', 
    component: BlogComponent,
    children: [
      {
        path: 'create-article', component: CreateArticleComponent, canActivate:[PermissionGuard]
      },
      {
        path: 'article/:id/create-post', component: CreatePostComponent, canActivate:[PermissionGuard]
      },
      {
        path: 'posts/:articleId', component: PostsComponent, canActivate:[PermissionGuard]
      }
    ]
  },
  {
    path: 'song-records',
    component: SongsComponent,
    children: [
      {
        path: 'create-record', component: CreateRecordComponent, canActivate:[PermissionGuard]
      },
      {
        path: ':id/details', component: DetailsComponent, canActivate:[PermissionGuard]
      }
    ]
  },
  {
    path: 'user/:id/profile', 
    component: ProfileComponent, 
    canActivate:[PermissionGuard],
    children: [
      {
        path: 'edit', component: EditProfileComponent, canActivate:[PermissionGuard]
      },
      {
        path: ':elementType/:elementId/:authorId/delete', component: DeleteElementComponent, canActivate:[PermissionGuard]
      },
    ]

  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeatureRoutingModule { }
