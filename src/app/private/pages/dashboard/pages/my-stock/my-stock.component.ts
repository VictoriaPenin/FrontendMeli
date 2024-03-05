import { SendFileService } from './../../../../services/send-file.service';
import { Component, OnInit, TemplateRef, ViewChild, OnDestroy, AfterViewInit, HostListener, ElementRef, Input } from '@angular/core';
import { MyDataStock } from './util/my-DataStock';
import { tap } from 'rxjs/operators';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MyStockService } from '../../../../services/Mystock.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatRadioModule } from '@angular/material/radio';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { Observable, Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';



@Component({
  selector: 'app-my-stock',
  standalone: true,
  imports: [
    MatTableModule,
    MatRadioModule,
    FormsModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatPaginatorModule,
    MatDialogModule,
    CommonModule,
  ],
  templateUrl: './my-stock.component.html',
  styleUrls: ['./my-stock.component.scss']
})
export class MyStockComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('formFileStock') fileInput: ElementRef<HTMLInputElement> | undefined; // Referencia al campo de entrada de archivos

  @ViewChild('myTemplate') myTemplate!: TemplateRef<any> | undefined;
  contenidoTemplate!: TemplateRef<any>;

  @ViewChild('sendStockTemplate') sendStockTemplate!: TemplateRef<any>; // Inicialización de la propiedad sendStockTemplate
  private modal: NgbModal | undefined

  @ViewChild('fileInput') fileInputRef: ElementRef<HTMLInputElement> | undefined;

  useTemplate() {
    if (this.myTemplate) {
      // Aquí puedes utilizar el TemplateRef ya que sabes que no es undefined
    } else {
      console.error('TemplateRef es undefined. Asegúrate de inicializarlo correctamente.');
    }
  }


  openXL(contenidoTemplate: TemplateRef<any>, element: any) {
    // Implementación de la lógica...
    // Puedes acceder al template con contenidoTemplate
  }

  openMd(mdSendFileStock: TemplateRef<any>) {
    // Lógica para abrir el modal de enviar archivo
    // Por ejemplo, puedes abrir el modal utilizando MatDialog si estás usando Angular Material
    this.dialog.open(mdSendFileStock);
  }

  sendStock(data: any): Observable<any> {
    // Implementa la lógica para enviar el stock al servidor
    // Puedes hacer una solicitud HTTP al backend aquí
    // Ejemplo:
    // return this.http.post(`${this.apiUrl}/sendStock`, data);
    console.error('Method not implemented.');
    return new Observable(); // Retorna un observable vacío para evitar errores de compilación
  }

  sku = "";
  price = "";
  stock = "";
  selectedOption: string = 'miStock';
  totalElements: number = 0;

  displayedColumns: string[] = ['sku', 'price', 'available_quantity', 'stockSuplier', 'priceSuplier', 'nameSuplier', 'register_date', 'updateDateSuplier', 'acciones'];

  dataSource = new MatTableDataSource<any>([]);

  @ViewChild(MatPaginator) paginator?: MatPaginator;
  @ViewChild(MatSort) sort?: MatSort;
  private sortChangeSubscription?: Subscription;

  private myDataStock: MyDataStock;

  constructor(private stockService: MyStockService, private dialog: MatDialog, private SendFileService: SendFileService) {
    this.myDataStock = new MyDataStock(this.stockService);
   }


  ngOnDestroy() {
    this.sortChangeSubscription?.unsubscribe();
  }

  ngOnInit(): void {
    console.log("Inicializando MyStockComponent...");
    this.myDataStock.loadData(0, 5);
  }

  ngAfterViewInit() {
    this.fileInputRef = this.fileInput; // Asigna el valor de ViewChild a fileInputRef
    console.log("AfterViewInit: Cargando datos de stock...");
    this.loadData(0, 5);
    // Verificar si la referencia fileInput está definida
    if (!this.fileInputRef) {
      console.error('La referencia fileInput no está definida.');
    }
  }

  openNuevoRegistroModal(): void {
    this.dialog.open(this.sendStockTemplate);
  }

  loadDataPage(event: PageEvent) {
    const pageIndex = event.pageIndex;
    const pageSize = event.pageSize;
    this.loadData(pageIndex, pageSize);
  }

  async sendFile(event: Event) {
    event.preventDefault(); // Esto evita que el formulario se envíe de inmediato



    if (this.selectedOption === 'miStock') {
      await this.sendFileStock(event)
    } else if (this.selectedOption === 'proveedores') {
      await this.sendFileProveedores(event)
    }

    setTimeout(()=>{ this.update()},2000)

    // Continuar con el código para enviar el archivo
  }

  sendFileStock(event: Event) {
    event.preventDefault();

    if (!this.fileInput || !this.fileInput.nativeElement) {
      console.error('File input element not found.');
      return;
    }

    const fileInput = this.fileInput.nativeElement;

    if (!fileInput.files || !fileInput.files[0]) {
      console.error('No file selected.');
      return;
    }

    const file = fileInput.files[0];

    // Lógica para enviar el archivo
    this.SendFileService.sendStock(file)
      .then(() => {
        alert('Archivo enviado correctamente.');
      })
      .catch((error) => {
        alert('Error al enviar el archivo: ' + error);
        console.error(error);
      });
  }



  sendFileProveedores(event: Event) {
    event.preventDefault();
    // Lógica para enviar archivo de proveedores
  }

  update() {
    this.loadData(0, 10);
  }


  loadData(pageIndex: number, pageSize: number) {
    console.log("Cargando datos de stock...");
    this.stockService.getStockPage(pageIndex, pageSize).subscribe((data: any) => {
      console.log('Datos recibidos del servicio:', data);
      this.dataSource.data = data.content; // Asignar los datos recibidos al dataSource
      this.totalElements = data.totalElements;
    });
  }

  sendFileStockManual(event: Event) {
    event.preventDefault();

    const sku = (document.getElementById('sku') as HTMLInputElement).value;
    const precioCompra = (document.getElementById('precioCompra') as HTMLInputElement).value;
    const stock = (document.getElementById('stock') as HTMLInputElement).value;

    const data = {
      user_id: 1,
      content: [
        {
          sku: sku,
          available_quantity: parseInt(stock),
          price: parseFloat(precioCompra),
          register_date: new Date().toISOString().slice(0, 10) // Obtener la fecha actual en formato yyyy-mm-dd
        }
      ]
    };

    this.stockService.sendFileStockManual(data)
      .subscribe(() => {
        alert('Registro guardado correctamente.');
        // Aquí puedes realizar cualquier acción después de guardar el registro, como cerrar el modal
        this.dialog.closeAll();
        this.update(); // Actualizar la tabla de stock después de guardar el registro
      }, (error: any) => { // Aquí se especifica explícitamente el tipo de error como 'any'
        alert('Error al guardar el registro: ' + error);
        console.error(error);
      });
  }

}
