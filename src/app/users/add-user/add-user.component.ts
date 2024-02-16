import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/shared/interfaces/user.interface';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent {
  usuarioForm!: FormGroup;

  constructor(public dialogRef: MatDialogRef<AddUserComponent>,
              private servicioUsuario: UserService,
              public snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.usuarioForm = new FormGroup({
      id_usuario: new FormControl(0),
      usuario: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required]),
      id_rol: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required]),
      nombre_publico: new FormControl(null),
    });

  }

  async confirmAdd() {
    if (this.usuarioForm.valid) {
      const nuevoUsuario = this.usuarioForm.value as User;
      const response = await this.servicioUsuario.addUsuario(nuevoUsuario).toPromise();
      if (response && response.ok && response?.message) {
        this.snackBar.open(response.message, 'Cerrar', { duration: 5000 });
        this.dialogRef.close({ ok: true, data: response.data });
      } else {
        this.snackBar.open("Error al añadir al usuario.", 'Cerrar', { duration: 5000 });
      }
    } else {
      this.snackBar.open('Por favor complete el formulario correctamente', 'Cerrar', { duration: 5000 });
    }
  }

  onNoClick(): void {
    this.dialogRef.close({ok: false});
  }
}
