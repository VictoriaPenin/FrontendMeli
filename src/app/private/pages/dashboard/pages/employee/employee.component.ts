import { Component, OnInit, ViewChild } from '@angular/core';
import {  EmployeeService } from '../../../../services/employee.service';
import { FormsModule, NgForm } from '@angular/forms';
import { NgIf } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { DialogComponent } from './components/dialog/dialog.component';
import { Employee } from '../../../../Interfaces/Employee';
import { tap } from 'rxjs/operators';
import { EditEmployeeComponent } from './components/edit-employee/edit-employee.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employee',
  standalone: true,
  imports: [NgIf, MatSnackBarModule, MatPaginatorModule, MatCheckboxModule, MatTableModule, MatFormFieldModule, MatSelectModule, FormsModule, MatInputModule, MatIconModule, MatButtonModule, MatDialogModule],
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.scss'
})
export class EmployeeComponent  implements OnInit {

  dataSource!: MatTableDataSource<Employee>;
  displayedColumns: string[] = ['Username', 'Nombre', 'Apellido',  'Acciones'];

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  newEmployee: Employee = {
    id: 0,
    username: '',
    password: '',
    rePassword: '',
    email: '',
    name: '',
    lastname: '',
    rol: '',
     };

  constructor(private router: Router, private employeeService: EmployeeService, private dialog: MatDialog, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.employeeService.getEmployees().subscribe((employees) => {
      this.dataSource = new MatTableDataSource<Employee>(employees);
      this.dataSource.paginator = this.paginator; // Mueve esta línea aquí
    });
  }

  getEmployees(): void {
    this.employeeService.getEmployees().subscribe(
      (employees) => {
        this.dataSource = new MatTableDataSource<Employee>(employees);
        this.dataSource.paginator = this.paginator;
      },
      (error) => {
        console.error('Error fetching employees:', error);
      }
    );
  }

  updateEmployee(employee: Employee): void {
    // Convertir el ID de string a number
    employee.id = +employee.id;

    this.employeeService.updateEmployee(employee.id, employee).subscribe(
      () => {
        this.getEmployees();
        this.snackBar.open('Empleado actualizado correctamente', 'Cerrar', {
          duration: 2000,
        });
      },
      (error) => {
        console.error('Error updating employee:', error);
      }
    );
  }

  onEdit(employee: Employee): void {
    this.openEditDialog(employee);
  }

  openEditDialog(employee: Employee): void {
    const dialogRef = this.dialog.open(EditEmployeeComponent, {
      width: '250px',
      data: { ...employee } // Pasar una copia del empleado para evitar modificar el original
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.updateEmployee(result); // Llamar a la función de actualización del servicio
      }
    });
  }

  onDelete(employeeId: number): void {
    this.employeeService.deleteEmployee(employeeId).subscribe(
      () => {
        this.snackBar.open('Empleado eliminado correctamente', 'Cerrar', {
          duration: 2000,
        }).afterDismissed().subscribe(() => {
          this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
            this.router.navigate(['dashboard/employees']);
          });
        });
      },
      (error) => {
        console.error('Error deleting employee:', error);
        this.snackBar.open('Empleado eliminado correctamente', 'Cerrar', {
          duration: 2000,
        });
      }
    );
  }
  
  openDeleteDialog(employeeId: number): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '250px',
      data: { message: '¿Está seguro de eliminar este empleado?' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.onDelete(employeeId);
      }
    });
  }
  onSubmit(form: NgForm): void {
    if (form.valid) {
      // Verificar si el nombre de usuario ya existe en la base de datos
      const existingEmployee = this.dataSource.data.find(employee => employee.username === this.newEmployee.username);
      if (existingEmployee) {
        this.snackBar.open('Error: El nombre de usuario ya existe', 'Cerrar', {
          duration: 2000,
        });
        return;
      }
  
      // Crear el nuevo empleado si no existe
      this.employeeService.createEmployee(this.newEmployee).pipe(
        tap(() => {
          form.resetForm();
        })
      ).subscribe(
        () => {
          this.getEmployees();
          this.snackBar.open('Empleado creado correctamente', 'Cerrar', {
            duration: 2000,
          });
        },
        (error) => {
          console.error('Error al crear el empleado:', error);
        }
      );
    }
  }
  
  
  reloadPage(): void {
    window.location.reload();
  }
  
}