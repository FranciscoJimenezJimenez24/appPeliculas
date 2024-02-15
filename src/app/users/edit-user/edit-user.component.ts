import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/shared/interfaces/user.interface';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent {
  usuarioForm!: FormGroup;

  constructor(public dialogRef: MatDialogRef<EditUserComponent>,
              private servicioUsuario: UserService,
              public snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.usuarioForm = new FormGroup({
      usuario: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required]),
      id_rol: new FormControl(null, [Validators.required]),
      nombre_publico: new FormControl(null),
    });

  }

  async confirmEdit() {
    if (this.usuarioForm.valid) {
      const usuario = this.usuarioForm.value as User;
      const response = await this.servicioUsuario.editUsuario(usuario).toPromise();
      if (response && response.ok && response?.message) {
        this.snackBar.open(response.message, 'Cerrar', { duration: 5000 });
        this.dialogRef.close({ ok: true, data: response.data });
      } else {
        this.snackBar.open("Error al editar al usuario.", 'Cerrar', { duration: 5000 });
      }
    } else {
      this.snackBar.open('Por favor complete el formulario correctamente', 'Cerrar', { duration: 5000 });
    }
  }

  onNoClick(): void {
    this.dialogRef.close({ok: false});
  }
}
