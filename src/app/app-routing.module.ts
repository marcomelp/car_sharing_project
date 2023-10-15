import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './component/home/home.component';
import { AdminDashComponent } from './component/admin-dash/admin-dash.component';
import { UserDashComponent } from './component/user-dash/user-dash.component';
import { RatesAndServicesComponent } from './component/rates-and-services/rates-and-services.component';
import { FaqComponent } from './component/faq/faq.component';
import { WorkWithUsComponent } from './component/work-with-us/work-with-us.component';
import { USER_GUARD } from './auth/user-auth';
import { ADMIN_GUARD } from './auth/admin-auth';

const routes: Routes = [
  {path:"", component:HomeComponent},
  {path:"admin", component:AdminDashComponent, canActivate:[ADMIN_GUARD]},
  {path:"user", component:UserDashComponent, canActivate:[USER_GUARD]},
  {path:"rates", component:RatesAndServicesComponent},
  {path:"faq", component:FaqComponent},
  {path:"workWithUs", component:WorkWithUsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
