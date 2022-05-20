import { Component, OnInit } from '@angular/core';
import { PersonService } from '../../../service/person/person.service';
import { HomeService } from 'src/app/service/person/home.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import Swal from 'sweetalert2'
import { Departamentos } from 'src/app/models/departamentos';
import { Genero } from 'src/app/models/genero';
import { Municipios } from 'src/app/models/municipios';
import { TipoId } from 'src/app/models/TipoId';



@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  form: FormGroup ;
  departamentos: Departamentos[]
  genero: Genero[]
  municipios: Municipios[]
  municipiosview: Municipios[]

  tipoid: TipoId[]
  constructor(
    public personService: PersonService,
    private router: Router,
    private homeService: HomeService
  ) { }

  ngOnInit(): void {

    this.form = new FormGroup({
      identificacion: new FormControl('', [ Validators.required, Validators.pattern("^[0-9]*$") ]),
      tipo_id: new FormControl('', [ Validators.required, Validators.required ]),

      nombre1:  new FormControl('', [ Validators.required, Validators.pattern('^[a-zA-ZÁáÀàÉéÈèÍíÌìÓóÒòÚúÙùÑñüÜ \-\']+') ]),
      nombre2:  new FormControl('', [ Validators.pattern('^[a-zA-ZÁáÀàÉéÈèÍíÌìÓóÒòÚúÙùÑñüÜ \-\']+')  ]),
      apellido1: new FormControl('', [ Validators.required, Validators.pattern('^[a-zA-ZÁáÀàÉéÈèÍíÌìÓóÒòÚúÙùÑñüÜ \-\']+')  ]),
      apellido2: new FormControl('', [ Validators.pattern('^[a-zA-ZÁáÀàÉéÈèÍíÌìÓóÒòÚúÙùÑñüÜ \-\']+')  ]),
      genero: new FormControl('', [ Validators.required, Validators.required ]),
      departamento: new FormControl('', [ Validators.required, Validators.required ]),
      municipio: new FormControl('', [ Validators.required, Validators.required ]),

    });
    this.loadInformacion()

  }
  loadInformacion(){
    this.homeService.getAllTipoId().subscribe((data: TipoId[])=>{
      this.tipoid = data;
    })
    this.homeService.getAllTipoGener().subscribe((data: Genero[])=>{
      this.genero = data;
    })
    this.homeService.getAllDepartament().subscribe((data: Departamentos[])=>{
      this.departamentos = data;
    })
    this.homeService.getAllCity().subscribe((data: Municipios[])=>{
      this.municipios = data;
    })

  }
  get f(){
    return this.form.controls;
  }
  changeDepartament(event:any){
    console.log("entrooo")
    console.log(event.target.value)
    let filter = this.municipios.filter(e=>e.departamento_id == event.target.value)
    this.municipiosview = filter

  }

  submit(){
    console.log(this.form.value);
    this.personService.create(this.form.value).subscribe(res => {
      var response = res
      if (response.success) {
        this.router.navigateByUrl('pacientes/index');
        Swal.fire({
          title: 'Success',
          icon: 'success',

        })
      }
      else{
        Swal.fire({
          title: 'Error',
          text: response.message,
          icon: 'warning',

        })
      }

    })
  }

}
