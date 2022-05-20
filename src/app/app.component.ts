import { Component, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PersonService } from './service/person/person.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnChanges, OnDestroy  {
  title = 'Sinergia';
  estado = localStorage.getItem("session_success");

  ngOnInit(){
    console.log("lol")

    this.obtainSessionStatus()
  }

  constructor(
    private router:Router,
    private personService:PersonService
  ) {
    router.events.subscribe((val) => {
      // see also
      console.log("cambio rutas")
      this.estado = localStorage.getItem("session_success");
  });
  }

  ngOnChanges() {
    console.log("lol")

    // changes.prop contains the old and the new value...
  }
  ngOnDestroy(): void {
      console.log("lol")
  }
  pagina(ruta:string):void{
    this.router.navigateByUrl(ruta);

  }



  cerrar_sesion(){
    localStorage.removeItem("session_success")
    this.estado = null
    this.router.navigateByUrl('/login');

  }
  obtainSessionStatus(){


  }


}
