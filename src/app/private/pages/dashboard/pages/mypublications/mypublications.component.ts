import { MyPublicationsService } from './../../../../services/MyPublicationsService.service';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, FormControl} from '@angular/forms';
import { MatCommonModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { FlexLayoutModule } from '@angular/flex-layout';
import { carditem } from './component/carditem.component';




@Component({
  selector: 'app-mypublications',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatIconModule, MatButtonToggleModule,FormsModule,
    MatCommonModule,MatCardModule, CommonModule, MatMenuModule, MatTooltipModule, MatButtonModule, FlexLayoutModule, MatCardModule,carditem,],
  templateUrl: './mypublications.component.html',
  styleUrl: './mypublications.component.scss'
})
export class MypublicationsComponent implements OnInit{

  myForm: FormGroup | undefined;
  [x: string]: any;

  onRadioChange(): void {
    this.filterProducts();
  }


  products:any[] = [];
  currentPage: number = 0;
  pageSize: number = 5;
  totalElements?: number = 0;
  searchTerm: string = '';
  searchType: string = '';
  selectedOption: string = 'all';
  isCatalogue: boolean = false;

  flag : boolean = false;

  longText: any;

  constructor ( private myPublicationsService: MyPublicationsService,

    private fb: FormBuilder,) {
      this.myForm = this.fb.group({
        firstName: new FormControl()
      });
    }

  ngOnInit() {
    this.getData();
    this.searchForm = new FormGroup({
      searchType: new FormControl(''),
      searchTerm: new FormControl('')
    });
  }


  searchForm: FormGroup = this.fb.group({
    searchTerm: [''],
    searchType: ['id']
  });

  getData(){
    this.myPublicationsService.getSearchDataMyProducts(this.currentPage, this.pageSize, this.searchType, this.searchTerm, this.isCatalogue).subscribe(data => {
      this.products = data.content;
      this.totalElements = data.totalElements;
      this.pageSize = data.size;
      console.log(this.products);


    })
  }


  //Paginado
  nextPage() {
    if (this.totalElements !== undefined && this.pageSize !== undefined) {
      if (this.currentPage < (this.totalElements / this.pageSize) - 1) {
        this.currentPage++;
        if (!this.flag) {
          this.getData();
        } else {
          this.getDataFilter()
        }
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    }
  }

  previousPage() {
    if (this.currentPage > 0) {
      this.currentPage--;
      if (!this.flag) {
        this.getData();
      } else {
        this.getDataFilter()
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  filterProducts(): void {
    this.isCatalogue = this.selectedOption === 'catalogue';
    this.currentPage = 0;
    this.getDataFilter();
  }



  getDataFilter() {
    console.log('Iniciando getDataFilter');
    this.myPublicationsService.getSearchDataMyProducts(this.currentPage, this.pageSize, this.searchType, this.searchTerm, this.isCatalogue)
      .subscribe(
        data => {
          console.log('Respuesta del servicio:', data);
          if (data && data.content !== undefined && data.content !== null) {
            // Verificar que data.content no sea null ni undefined
            this.products = data.content;
            this.totalElements = data.totalElements;
            this.pageSize = data.size;
            console.log(data);
          } else {
            console.error('Error: El objeto de datos o su propiedad content es nulo o indefinido.');
            this.products = [];
            this.totalElements = 0;
            this.pageSize = 5;
          }
        },
        error => {
          console.error('Error en la suscripción:', error);
          this.products = [];
          this.totalElements = 0;
          this.pageSize = 5;
        }
      );
    console.log('Fin de getDataFilter');
  }





  async updateItems() {
    try {
      console.log('Spinner Service:', this['spinnerServ']);

      if (this['spinnerServ'] && this['spinnerServ'].show) {
        console.log('Showing spinner...');
        this['spinnerServ'].show();
      }

      if (this.myPublicationsService && this.myPublicationsService.updateItems) {
        await this.myPublicationsService.updateItems().toPromise();
        this.getData();
      } else {
        console.error('MyPublicationsService or updateItems method is undefined');
      }

      if (this['spinnerServ'] && this['spinnerServ'].hide) {
        console.log('Hiding spinner...');
        this['spinnerServ'].hide();
      }
    } catch (error) {
      console.error('Error updating items:', error);
    }
  }






}
