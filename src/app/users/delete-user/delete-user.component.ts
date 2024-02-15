import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/shared/interfaces/user.interface';

@Component({
  selector: 'app-delete-user',
  templateUrl: './delete-user.component.html',
  styleUrls: ['./delete-user.component.css']
})
export class DeleteUserComponent {
  constructor(public dialogRef: MatDialogRef<DeleteUserComponent>,
    @Inject(MAT_DIALOG_DATA) public usuario: User,
    private servicioUsuario: UserService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
  }

  async confirmDelete() {
    const RESPONSE = await this.servicioUsuario.deleteUsuario(this.usuario).toPromise();

    if (RESPONSE && RESPONSE.message) { // Comprueba si RESPONSE y RESPONSE.message son definidos
      if (RESPONSE.ok) {
        this.snackBar.open(RESPONSE.message, 'Cerrar', { duration: 5000 });
        this.dialogRef.close({ ok: RESPONSE.ok, data: RESPONSE.data });
      } else {
        this.snackBar.open(RESPONSE.message, 'Cerrar', { duration: 5000 });
      }
    } else {
      // Maneja el caso donde RESPONSE o RESPONSE.message son undefined
      // Por ejemplo, muestra un mensaje de error o realiza alguna acción adecuada
      console.error('RESPONSE o RESPONSE.message es undefined');
    }
  }

  onNoClick() {
    this.dialogRef.close({ok: false});
  }
}
