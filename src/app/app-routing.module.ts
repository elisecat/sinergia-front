import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './page/person/index/index.component';
import { CreateComponent } from './page/person/create/create.component';
import { EditComponent } from './page/person/edit/edit.component';
import { LoginComponent } from './page/login/login.component';
import { AuthGuard } from 'src/app/guards/auth.guard';



const routes: Routes = [

  { path: 'login', component: LoginComponent},

   { path: 'pacientes', redirectTo: 'pacientes/index'},
   { path: 'pacientes/index', component: IndexComponent,  canActivate:[AuthGuard] },
   { path: 'pacientes/create', component: CreateComponent,  canActivate:[AuthGuard] },
   { path: 'pacientes/edit/:id', component: EditComponent, canActivate:[AuthGuard] },
   {path : '**', redirectTo:'login', pathMatch: 'full'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
