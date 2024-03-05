import { Component, OnDestroy, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatTable, MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { MatSort } from '@angular/material/sort';
import { Subscription, tap } from 'rxjs';
import { CostService } from '../../../../services/cost.service';
import { MyDataCost } from './Util/my-DataCost';


@Component({
  selector: 'app-cost',
  standalone: true,
  imports: [MatPaginatorModule, MatCheckboxModule, MatTableModule, MatFormFieldModule, MatSelectModule, FormsModule, MatInputModule, MatIconModule, MatButtonModule, FormsModule, CommonModule],
  templateUrl: './cost.component.html',
  styleUrl: './cost.component.scss'
})

export class CostComponent implements OnDestroy {
  costData: any[] = [];
  private sellerId = 1152777827;
  dataSource!: MyDataCost;
  totalElements: number = 0;
  marginMin = 10;

  constructor(private costService: CostService) {}

  displayedColumns: string[] = ['MLA', 'Stock total', 'Comisión ML', 'Envío', 'Costo de compra', 'IIBB', 'Costo total', 'Precio de venta', 'Ganancia', 'Margen'];
  costResponseKey: string[] = ['id', 'total_stock', 'item_cost.comision_fee', 'item_cost.shipping', 'item_cost.replacement_cost', 'item_cost.iibb', 'item_cost.total_cost', 'price', 'item_cost.profit', 'item_cost.margin']

  @ViewChild(MatPaginator) paginator?: MatPaginator;
  @ViewChild(MatSort) sort?: MatSort;
  @ViewChild(MatTable) table?: MatTable<any>;

  private dataSubscription?: Subscription;

  ngOnInit(): void {
    this.dataSource = new MyDataCost(this.costService);
    this.dataSource.loadData(1, 5);

    this.dataSubscription = this.dataSource.getTotalElements()
      .subscribe((totalElements: number) => {
        this.totalElements = totalElements;
      });
  }

  ngAfterViewInit() {
    this.paginator?.page
      .pipe(
        tap(() => this.loadDataPage())
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this.dataSubscription?.unsubscribe();
  }

  loadDataPage() {
    if (this.paginator && this.paginator.pageIndex !== undefined && this.paginator.pageSize !== undefined) {
      this.dataSource.loadData(this.paginator.pageIndex, this.paginator.pageSize);
    }
  }

  getPropertyValue(obj: any, propPath: string): any {
    const props = propPath.split('.');
    return props.reduce((acc, current) => acc ? acc[current] : undefined, obj);
  }

  getCellStyle(column: string, element: any) {
    let classStyle = '';
    if (column.includes('Ganancia') || column.includes('Margen')) {
      if (element.item_cost.margin >= this.marginMin) {
        classStyle = 'text-success fw-medium';
      } else {
        classStyle = 'text-danger fw-bold';
      }
    }
    if (column.includes('MLA')) {
      classStyle = 'mla-font';
    }

    return classStyle;
  }}