import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { PersonService } from '../../../service/person/person.service';
import { Pacientes } from '../../../models/pacientes';
import Swal from 'sweetalert2'
import { Genero } from 'src/app/models/genero';
import { Municipios } from 'src/app/models/municipios';
import { Departamentos } from 'src/app/models/departamentos';
import { HomeService } from 'src/app/service/person/home.service';
import { TipoId } from 'src/app/models/TipoId';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  id: number;
  person: Pacientes;
  form: FormGroup;
  genero: Genero[]
  tipoid: TipoId[]
  municipios: Municipios[]
  municipiosview: Municipios[]
  departamentos: Departamentos[]

  constructor(
    public personService: PersonService,
    private route: ActivatedRoute,
    private router: Router,
    private homeService: HomeService
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.personService.find(this.id).subscribe((data: Pacientes)=>{
      console.log(data);
      this.person = data;

      console.log("esta es la persona fucj",this.person);

    });
    this.loadInformacion()

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

  }

  get f(){
    return this.form.controls;
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
      let filter = this.municipios.filter(e=>e.departamento_id == this.person.departamento.id)
      this.municipiosview = filter
    })

  }

  submit(){
    console.log(this.form.value);
    this.personService.update(this.id, this.form.value).subscribe(res => {
      var response = res
      if (response.success) {
        this.router.navigateByUrl('pacientes/index');
        Swal.fire({
          title: 'Success',
          text: response.message,
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
  changeDepartament(event:any){
    console.log("entrooo")
    console.log(event.target.value)
    let filter = this.municipios.filter(e=>e.departamento_id == event.target.value)
    this.municipiosview = filter

  }


}
