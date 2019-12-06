import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthclientGuard } from './authclient.guard';


const routes: Routes = [
  { path: '', redirectTo: 'signin', pathMatch: 'full' },
  { path: 'signup', loadChildren: './signup/signup.module#SignupPageModule' },
  { path: 'signin', loadChildren: './signin/signin.module#SigninPageModule' },
  {
    path: 'tabs',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  { path: 'addmybook', loadChildren: './add-mybook/add-mybook.module#AddMybookPageModule' },
  { path: 'bookdetail/:id', loadChildren: './bookdetail/bookdetail.module#BookdetailPageModule'},
  { path: 'editmybook/:id', loadChildren: './editbook/editbook.module#EditbookPageModule'},
  { path: 'bookmoreinfo/:id', loadChildren: './bookmoreinfo/bookmoreinfo.module#BookmoreinfoPageModule'},
  { path: 'profile', loadChildren: './profile/profile.module#ProfilePageModule'},
  { path: 'view-info-user/:id', loadChildren: './view-info-user/view-info-user.module#ViewInfoUserPageModule' },
  { path: 'category', loadChildren: './category/category.module#CategoryPageModule'},
  { path: 'activity', loadChildren: './activity/activity.module#ActivityPageModule' },
  { path: 'books-by-cate', loadChildren: './books-by-cate/books-by-cate.module#BooksByCatePageModule' },
  

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  providers: [AuthclientGuard],
  exports: [RouterModule]
})
export class AppRoutingModule {}
