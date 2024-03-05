import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MetricService } from '../../../../../../services/Metric.service';
import { TopItem, categorie } from '../../../../../../Interfaces/Metrics';
import { ItemTopComponent } from "../item-top/item-top.component";


@Component({
    selector: 'app-top-item-categorie',
    standalone: true,
    templateUrl: './top-item-categorie.component.html',
    styleUrl: './top-item-categorie.component.scss',
    imports: [MatSelectModule,
        MatButtonModule,
        MatSnackBarModule,
        MatProgressSpinnerModule,
        MatIconModule,
        MatCardModule, ItemTopComponent]
})
export class TopItemCategorieComponent implements OnInit{
  categories: categorie[] = [];
  topItems: TopItem[] = [];
  spinnerTopItem:boolean = false;


  constructor(private servicesmetrics:MetricService){

  }

  ngOnInit(): void {
    this.loadCategories();
  }

  

  


  loadCategories(): void {
    this.servicesmetrics.getAllCategorie().subscribe(
      (data: categorie[]) => {
        this.categories = data;
      },
      (error) => {
        console.error('Error fetching categories', error);
      }
    );
  }

  getItemTop(id:any){
    this.servicesmetrics.getTopItem(id).subscribe(
      (data:any) =>{
        this.topItems = data;
        this.spinnerTopItem = false;
      },
      (error) => {
        console.error('Error fetching topItem', error);
      }
    )
  }
  onCategorySelectionChange(selectedCategoryId: string): void {
    if (selectedCategoryId) {
      // Si se selecciona una categoría, llamar a la función getTop
      this.getItemTop(selectedCategoryId);
      this.topItems=[]
      this.spinnerTopItem = true;
    }
  }

}
