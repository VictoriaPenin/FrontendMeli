import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatChipsModule} from '@angular/material/chips';
import {MatRadioModule} from '@angular/material/radio';
import {MatDividerModule} from '@angular/material/divider';
import {MatBadgeModule} from '@angular/material/badge';
import {MatSliderModule} from '@angular/material/slider';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs';
import {  ProductResponse} from '../../../../Interfaces/Competencia';
import { NgFor } from '@angular/common';
import {MatTreeModule} from '@angular/material/tree';
import {MatExpansionModule} from '@angular/material/expansion';
import { CardCompeComponent } from "./components/card-compe/card-compe.component";
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';


@Component({
    selector: 'app-competence',
    standalone: true,
    templateUrl: './competence.component.html',
    styleUrl: './competence.component.scss',
    imports: [MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule, MatIconModule,
        MatButtonToggleModule, MatChipsModule, MatRadioModule, MatDividerModule, MatBadgeModule, MatSliderModule,
        NgFor, MatTreeModule, MatExpansionModule, CardCompeComponent,MatProgressSpinnerModule]
})
export class CompetenceComponent  implements OnInit{

  init:boolean = false
  value = '';
  url = "https://api.mercadolibre.com/sites/MLA/search?nickname="
  productFilters: ProductResponse  | undefined;
  panelOpenState = false;
  showSpinner = false;
  imagen = "http://http2.mlstatic.com/D_966564-MLU72761226328_112023-I.jpg"
  selectedFilters: any;
  isSelected: boolean = false;
  
  offset:number =0;
  parametros: { [key: string]: any } = {};
  


  constructor(private http: HttpClient, private _snackBar: MatSnackBar ){}


  ngOnInit(): void {
  
  }

  buscarDatos(): void {
    if (this.value) {
      this.parametros = {};
      this.init = true;
      this.showSpinner=true;
      this.getData(this.value);
    }
  }

  getData(nickname: string, ): void {
    let httpParams = new HttpParams();
    
    if (this.parametros) {
      for (const key in this.parametros) {
        if (this.parametros.hasOwnProperty(key)) {
          httpParams = httpParams.set(key, this.parametros[key].value);
        }
      }
    }

    this.http.get<ProductResponse>(this.url + nickname, { params: httpParams }) .pipe(
      map((rep: ProductResponse) => {
       this.productFilters = rep;
       this.offset = rep.paging.offset;
       this.showSpinner = false;
       
      
       console.log(rep)
       if(rep.results.length === 0) {
        this.error("No se encontro el User")
       }
      })
    ).subscribe();
  }


  truncateString(str: string, maxLength: number): string {
    return str.length > maxLength ? str.slice(0, maxLength) + '...' : str;
  }

  error(msj:string){
    this._snackBar.open(msj,"",{
      horizontalPosition:'center',
      verticalPosition:'top',
      panelClass: ["style-error"],
      duration:5000
    });
  }

  agregarParametro(key:string, value:string,name:string,nickname:string){
    this.parametros[key] = { value, name };
    this.getData(nickname)
  }
  obtenerClaves() {
    return Object.keys(this.parametros);
  }
  siguientePagina(nickname:string){
    let value = this.offset + 50;
    this.parametros["offset"] = {value}
    this.getData(nickname)
  }
  paginaAnterior(nickname:string){
    let value = this.offset - 50;
    this.parametros["offset"] = {value}
    this.getData(nickname)
  }
  hasNextpag(off:number,totalitems:number, limit:number):boolean{
    if(off >= totalitems || (off+50)>= totalitems){
      return true;
    }
    return false;
  }
}
  
