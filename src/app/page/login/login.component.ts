import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PersonService } from 'src/app/service/person/person.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: FormGroup
  constructor(
    private personService: PersonService,
    private router: Router
  ) { }

  ngOnInit(): void {

    this.form = new FormGroup({
      usuario: new FormControl('', [ Validators.required ]),
      password: new FormControl('', [ Validators.required]),


    });
  }

  get f(){
    return this.form.controls;
  }
  submit(){
    console.log("aaaaa")
    if(this.form.valid){
      this.personService.obtaintoken().subscribe(res => {
        console.log(res)
        localStorage.setItem("token_xsfr",res.token)
        this.personService.login(this.form.value).subscribe(res => {
          console.log(res)
          if(res.success){
            localStorage.setItem("session_success",'true')
            this.router.navigateByUrl('/pacientes/index');

          }
          else{
            Swal.fire({
              title: 'Error',
              text: 'usuario incorrecto',
              icon: 'warning',

            })
          }



        })
      })
    }

  }

}
