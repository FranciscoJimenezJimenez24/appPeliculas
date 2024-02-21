import { HttpHeaders } from '@angular/common/http';
import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { CommonService } from 'src/app/shared/common.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styles: [
  ]
})
export class LoginPageComponent {
  @Output() valueChange = new EventEmitter();
  @ViewChild('passwordInput') passwordInput!: ElementRef;

  loginForm!: FormGroup;
  titulo = 'LOGEAO';
  alerta!: string;
  showSpinner!: boolean;
  error!: string;
  mostrarContrasena: boolean = false;

  constructor(
              private authService: AuthService,
              private router: Router,
              private snackBar: MatSnackBar,
              private commonService: CommonService
            ) { }

  ngOnInit() {
    this.setForm();
  }

  setForm() {
    this.loginForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
  }

  async acceder() {
    if (this.loginForm.valid) {
      const data = this.loginForm.value;
      const RESPONSE = await this.authService.login(data).toPromise();
      if (RESPONSE !== undefined){
        if (RESPONSE.ok) {
          if (RESPONSE.data.token) {
            localStorage.setItem('token', RESPONSE.data.token);
            localStorage.setItem('usuario', RESPONSE.data.usuario);
            localStorage.setItem('nombre_publico', RESPONSE.data.nombre_publico);
            localStorage.setItem('ultimaOpcion', RESPONSE.data.opcion);
            localStorage.setItem('ultimoGrupo', RESPONSE.data.grupo);
            localStorage.setItem('id_rol', RESPONSE.data.id_rol);
            localStorage.setItem('id_usuario', RESPONSE.data.id_usuario);
            this.commonService.headers = new HttpHeaders({
              'Content-Type': 'application/json',
              Authorization: `Bearer ${RESPONSE.data.token}`
            });
            this.router.navigate([`/movies/list`]);

          } else if (RESPONSE.data.valido === 0) {
            this.snackBar.open('Usuario inhabilitado', 'Cerrar', {duration: 5000});
          } else if (RESPONSE.data.valido === 1) {
            this.snackBar.open('Usuario o contraseña incorrectas', 'Cerrar', {duration: 5000});
          }
        }
      }

    }
  }

  forgotPassword() {
      this.valueChange.emit(true);
  }


}
