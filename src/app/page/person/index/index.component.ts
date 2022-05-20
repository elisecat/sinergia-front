import { Component, OnInit } from '@angular/core';

import { PersonService } from '../../../service/person/person.service';
import { Pacientes } from '../../../models/pacientes';
import Swal from 'sweetalert2'


@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  persons: Pacientes[] = [];

  // constructor() { }
  constructor(public personService: PersonService) { }

  ngOnInit(): void {
    this.personService.getAll().subscribe((data: Pacientes[])=>{
      this.persons = data;
      console.log(this.persons);
      console.log("jajajajjajaj");

    })
  }

  deletePerson(id:any){
    this.personService.delete(id).subscribe(res => {
         this.persons = this.persons.filter(item => item.id !== id);
         Swal.fire({
           title: 'Success',
           text: 'Estado guardado exitosamente',
           icon: 'success',

         })
    })
  }

}
