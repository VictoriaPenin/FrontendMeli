import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NgIf } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatOptionModule } from '@angular/material/core';
import { EditEmployee } from '../../../../../../Interfaces/EditEmployee';

@Component({
  selector: 'app-edit-employee',
  standalone: true,
  imports: [NgIf, MatSnackBarModule, MatOptionModule, MatPaginatorModule, MatCheckboxModule, MatTableModule, MatFormFieldModule, MatSelectModule, FormsModule, MatInputModule, MatIconModule, MatButtonModule, MatDialogModule],
  templateUrl: './edit-employee.component.html',
  styleUrl: './edit-employee.component.scss'
})
export class EditEmployeeComponent {
  editedEmoloyee: EditEmployee;
    constructor(
      private dialogRef: MatDialogRef<EditEmployeeComponent>,
      @Inject(MAT_DIALOG_DATA) public data: {employee: EditEmployee},

    ) {
      this.editedEmoloyee = {...data.employee };
    }
  
    saveChanges(): void {
      this.dialogRef.close(this.editedEmoloyee);
    }
  
    onCancelClick(): void {
      this.dialogRef.close(null);
    }
  
    closeDialog(): void {
      this.dialogRef.close();
    }
  }