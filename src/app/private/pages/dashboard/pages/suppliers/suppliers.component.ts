  import { ChangeDetectorRef, Component, Input, OnInit, ViewChild } from '@angular/core';
  import { MatTableDataSource, MatTableModule } from '@angular/material/table';
  import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
  import { MatCheckboxModule } from '@angular/material/checkbox';
  import { MatFormFieldModule } from '@angular/material/form-field';
  import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ChangeDetectionStrategy } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { EditSupplierDialogComponent } from './components/edit-supplier-dialog/edit-supplier-dialog.component';
import { Supplier, SuppliersService } from '../../../../services/suppliers.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { concatMap, finalize, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { NgIf } from '@angular/common';
import { DialogComponent } from '../employee/components/dialog/dialog.component';
import { NgForm, FormsModule } from '@angular/forms';

@Component({
  selector: 'app-suppliers',
  templateUrl: './suppliers.component.html',
  styleUrls: ['./suppliers.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.Default,

  imports: [NgIf, MatSnackBarModule, MatPaginatorModule, MatCheckboxModule, MatTableModule, MatFormFieldModule, MatSelectModule, FormsModule, MatInputModule, MatIconModule, MatButtonModule, MatDialogModule],
})
export class SuppliersComponent implements OnInit {
  dataSource = new MatTableDataSource<Supplier>([]);
  newSupplier: Supplier = {
    id: '',
    cuit: '',
    supplierName: '',
    domicilio: '',
    telefono: '',
    rubro: '',
  };

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  displayedColumns: string[] = ['cuit', 'supplierName', 'domicilio', 'telefono', 'rubro', 'actions'];

  constructor(private supplierService: SuppliersService, private dialog: MatDialog, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.loadSuppliers();
  }

  ngAfterViewInit(): void {
    if (this.paginator) {
      this.dataSource.paginator = this.paginator;
    }
  }

  loadSuppliers(): void {
    this.supplierService.getSuppliers().subscribe(
      (suppliers) => {
        this.dataSource.data = suppliers;
      },
      (error) => {
        console.error('Error fetching suppliers:', error);
      }
    );
  }

  addSupplier(): void {
    const existingSupplier = this.dataSource.data.find(supplier => supplier.cuit === this.newSupplier.cuit);
    if (existingSupplier) {
      this.showSnackbar('El proveedor ya existe');
      return;
    }
  
    this.supplierService.addSupplier(this.newSupplier).subscribe(
      (newSupplier) => {
        console.log('After addSupplier:', newSupplier);
        this.dataSource.data.push(newSupplier);
  
        // Limpiar el formulario y mostrar mensaje
        this.newSupplier = {
          id: '',
          cuit: '',
          supplierName: '',
          domicilio: '',
          telefono: '',
          rubro: '',
        };
  
        if (this.paginator) {
          this.paginator.pageIndex = 0;
          this.paginator.length = this.dataSource.data.length;
        }
  
        this.showSnackbar('Proveedor cargado exitosamente');
        this.reloadPage(); // <-- Agregar esta línea
      },
      (error) => {
        console.error('Error adding supplier:', error);
        this.showSnackbar('Error al agregar el proveedor');
      }
    );
  }
  

  editSupplier(supplier: Supplier): void {
    this.supplierService.getSupplierById(supplier.id).subscribe(
      (fullSupplier) => {
        this.openEditDialog(fullSupplier);
      },
      (error) => {
        console.error('Error fetching supplier for editing:', error);
      }
    );
  }

  openEditDialog(supplier: any): void {
    const dialogRef = this.dialog.open(EditSupplierDialogComponent, {
      width: '500px',
      data: { editedSupplier: { ...supplier } }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.supplierService.updateSupplier(result.id, result).subscribe(updatedSupplier => {
          const index = this.dataSource.data.findIndex(s => s.id === updatedSupplier.id);
          if (index !== -1) {
            this.dataSource.data[index] = updatedSupplier;
            this.dataSource._updateChangeSubscription();
            this.showSnackbar('Proveedor actualizado exitosamente');
          }
        });
      }
    });
  }
  
  openDeleteDialog(supplierId: string): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '250px',
      data: { title: 'Eliminar Proveedor', message: '¿Estás seguro de que deseas eliminar este proveedor?' },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.deleteSupplier(supplierId);
      }
    });
  }

  deleteSupplier(supplierId: string): void {
    this.supplierService.deleteSupplier(supplierId).subscribe(
      () => {
        this.dataSource.data = this.dataSource.data.filter((s) => s.id !== supplierId);
        this.showSnackbar('Proveedor eliminado exitosamente');
      },
      (error) => {
        console.error('Error deleting supplier:', error);
      }
    );
  }

  showSnackbar(message: string): void {
    this.snackBar.open(message, 'Cerrar', {
      duration: 3000,
    });
  }


reloadPage(): void {
  window.location.reload();
}

  }