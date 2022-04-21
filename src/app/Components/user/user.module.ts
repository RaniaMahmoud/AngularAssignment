import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { LayOutComponent } from '../lay-out/lay-out.component';
import { AuthorizationGuard } from 'src/app/Guards/authorization.guard';

const routes:Routes=[
  {
    path: '', component: LayOutComponent, children: [
      {path:'', redirectTo:'/UserProfile', pathMatch:'full'},
      {path: 'UserProfile', component:UserProfileComponent,canActivate:[AuthorizationGuard]},
      {path: 'EditProfile', component:EditProfileComponent,canActivate:[AuthorizationGuard]}
    ]
  },
]


@NgModule({
  declarations: [
    EditProfileComponent,
    UserProfileComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule
  ]
})
export class UserModule { }
