import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import {  Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Genero } from '../../models/genero';
import { Departamentos } from '../../models/departamentos';
import { Municipios } from '../../models/municipios';
import { TipoId } from '../../models/TipoId';


@Injectable({
  providedIn: 'root'
})
export class HomeService {

  private apiURL = "http://localhost:8000/api/person";

  httpOptions = {
     headers: new HttpHeaders({
       'Content-Type': 'application/json'
     })
  }

  constructor(private httpClient: HttpClient) { }

  getAllTipoId(): Observable<TipoId[]> {
   return this.httpClient.get<TipoId[]>(this.apiURL+'/getAllTipoId')
   .pipe(
     catchError(this.errorHandler)
   )
 }

 getAllTipoGener(): Observable<Genero[]> {
  return this.httpClient.get<Genero[]>(this.apiURL+'/getAllTipoGener')
  .pipe(
    catchError(this.errorHandler)
  )
}
getAllDepartament(): Observable<Departamentos[]> {
  return this.httpClient.get<Departamentos[]>(this.apiURL+'/getAllDepartament')
  .pipe(
    catchError(this.errorHandler)
  )
}
getAllCity(): Observable<Municipios[]> {
  return this.httpClient.get<Municipios[]>(this.apiURL+'/getAllCity')
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
