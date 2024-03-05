import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatOptionModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { Supplier } from '../../../../../../services/suppliers.service';


@Component({
  selector: 'app-edit-supplier-dialog',
  standalone: true,
  imports: [MatPaginatorModule, MatCheckboxModule, MatTableModule, MatFormFieldModule, MatSelectModule, FormsModule, MatInputModule, MatIconModule, MatButtonModule, MatDialogModule, MatOptionModule],
  templateUrl: './edit-supplier-dialog.component.html',
  styleUrl: './edit-supplier-dialog.component.scss'
})
export class EditSupplierDialogComponent {
  editedSupplier: Supplier;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { editedSupplier: Supplier },
    private dialogRef: MatDialogRef<EditSupplierDialogComponent>
  ) {
    this.editedSupplier = { ...data.editedSupplier };
  }

  saveChanges(): void {
    this.dialogRef.close(this.editedSupplier);
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}