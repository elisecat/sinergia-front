import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Routes, RouterModule } from '@angular/router';

import { CreateComponent } from './page/person/create/create.component';
import { EditComponent } from './page/person/edit/edit.component';
import { IndexComponent } from './page/person/index/index.component';

import { HttpClientModule, HttpClient } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './page/login/login.component';




@NgModule({
  declarations: [
    AppComponent,

    CreateComponent,
    EditComponent,
    IndexComponent,
    LoginComponent,


  ],
  imports: [

    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,

    ReactiveFormsModule,
    RouterModule.forRoot([
    { path: 'person', redirectTo: 'person/index', pathMatch: 'full'},
    { path: 'person/index', component: IndexComponent },
    { path: 'person/create', component: CreateComponent },
    { path: 'person/edit/:idPerson', component: EditComponent }
  ]),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
