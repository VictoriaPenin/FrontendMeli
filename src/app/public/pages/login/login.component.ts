import { Component} from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthServiceService } from '../../../services/auth-service.service';
import { Router, RouterLink } from '@angular/router';

//Material
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatIconModule} from '@angular/material/icon';



@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    CommonModule,
    MatIconModule,
    RouterLink
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  form: FormGroup;
  loading = false;
  firstOpcion = false;
  constructor(private fb: FormBuilder, private _snackBar: MatSnackBar, private authService: AuthServiceService,private router: Router,){
    this.form = this.fb.group(
      {
        usuario: ["",Validators.required],
        password: ["",Validators.required]
      }
    )
  }
  ingresar() {
    const usuario = this.form.value.usuario;
    const password = this.form.value.password;
  
    this.authService.isAuth(usuario, password).subscribe(
      (res: any) => {
        if (res == true) {
          this.fakeLoading();
          this.susses();
          this.router.navigateByUrl('/dashboard/home');
        } else {
          this.error("Error en el Usuario o contraseña");
        }
      },
      (err: any) => {
        // Esta parte ahora está correctamente ubicada en el bloque de manejo de error
        this.error(err?.error?.mensaje);
      }
    );
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
    this._snackBar.open("Bienvenido","",{
      horizontalPosition:'center',
      verticalPosition:'top',
      panelClass: ["style-green"],
      duration:5000
    });
  }

  fakeLoading(){
    this.loading = true
    setTimeout(() =>{
      this.loading = false
    },15000);
  }

  opcionalSeller(){
    this.firstOpcion = true;
  }

  
}

