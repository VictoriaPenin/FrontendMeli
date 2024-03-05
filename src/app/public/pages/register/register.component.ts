import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Router, RouterLink } from '@angular/router';
import { AuthServiceService } from '../../../services/auth-service.service';
import { RegisterUser } from '../../interfaces/authIterface';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ MatInputModule,
    MatSelectModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    CommonModule,
    MatIconModule,
    RouterLink,
    MatFormFieldModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  form: FormGroup;
  user:RegisterUser={
    username: '',
    password: '',
    rePassword: '',
    email: '',
    seller_id: 0
  };

  constructor(private fb: FormBuilder, private _snackBar: MatSnackBar, private authService: AuthServiceService,private router: Router){
    this.form = this.fb.group(
      {
        usuario: ["",Validators.required],
        password: ["",Validators.required],
        rePassword:["",Validators.required],
        email:["",[Validators.required,Validators.email]]
      }
    )
  }

  submitForm() {
    if (this.form.valid) {
      if (this.form.value.password !== this.form.value.rePassword) {
        this._snackBar.open('Las contraseñas no coinciden', 'Cerrar', {
          duration: 3000,
        });
        return;
      }
      this.user.email = this.form.value.email;
      this.user.password = this.form.value.password
      this.user.rePassword = this.form.value.rePassword
      this.user.username = this.form.value.usuario
      this.authService.sellerRegister(this.user).subscribe((res: any) => {
        this.susses();
        this.router.navigateByUrl('/login');
      },
      (err: any) => {
        // Esta parte ahora está correctamente ubicada en el bloque de manejo de error
        this.error(err?.error?.mensaje);
      }
    )
        

      
      
    } else {
      this._snackBar.open('Por favor, completa todos los campos correctamente', 'Cerrar', {
        duration: 3000,
      });
    }
  }
  error(msj:string){
    this._snackBar.open(msj,"",{
      horizontalPosition:'center',
      verticalPosition:'top',
      panelClass: ["style-error"],
      duration:5000
    });
  }
  susses(){
    this._snackBar.open("Usuario Creado","",{
      horizontalPosition:'center',
      verticalPosition:'top',
      panelClass: ["style-green"],
      duration:5000
    });
  }

}

