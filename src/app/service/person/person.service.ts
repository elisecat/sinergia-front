import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import {  Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Pacientes } from '../../models/pacientes';

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  private apiURL = "http://localhost:8000/api/person/";
  private api = "http://localhost:8000/api/";

  public token:any = localStorage.getItem('token_xsfr')
  httpOptions = {
     headers: new HttpHeaders({
       'Content-Type': 'application/json',
       'X-CSRFToken': this.token == null ? '':this.token
     })
  }

  constructor(private httpClient: HttpClient) {

  }

  getAll(): Observable<Pacientes[]> {
   return this.httpClient.get<Pacientes[]>(this.apiURL)
   .pipe(
     catchError(this.errorHandler)
   )
 }

 create(person:any): Observable<Pacientes> {
   return this.httpClient.post<Pacientes>(this.apiURL, JSON.stringify(person), this.httpOptions)
   .pipe(
     catchError(this.errorHandler)
   )
 }

 find(id:number): Observable<Pacientes> {
   return this.httpClient.get<Pacientes>(this.apiURL + id)
   .pipe(
     catchError(this.errorHandler)
   )
 }

 update(id:number, person:any): Observable<Pacientes> {
   return this.httpClient.put<Pacientes>(this.apiURL + id, JSON.stringify(person), this.httpOptions)
   .pipe(
     catchError(this.errorHandler)
   )
 }

 delete(id:number){
   return this.httpClient.delete<Pacientes>(this.apiURL + id, this.httpOptions)
   .pipe(
     catchError(this.errorHandler)
   )
 }


 obtaintoken(){
  return this.httpClient.get<any>(this.api+'obtain_crfs_token', this.httpOptions)
  .pipe(
    catchError(this.errorHandler)
  )
 }
 login(data:any){
   data._token = localStorage.getItem('token_xsfr')
  return this.httpClient.post<any>(this.api+'login', JSON.stringify(data), this.httpOptions)
  .pipe(
    catchError(this.errorHandler)
  )
 }

 errorHandler(error:any) {
   let errorMessage = '';
   if(error.error instanceof ErrorEvent) {
     errorMessage = error.error.message;
   } else {
     errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
   }
   return throwError(errorMessage);
 }

}
