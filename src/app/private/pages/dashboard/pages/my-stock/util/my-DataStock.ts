import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { catchError, finalize, map, tap } from 'rxjs/operators';
import { StockItem } from './../../../../../../private/Interfaces/Responses';
import { MyStockService } from '../../../../../services/Mystock.service';

export class MyDataStock extends DataSource<StockItem> {
  private dataSubject = new BehaviorSubject<StockItem[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);
  private totalElementsSubject = new BehaviorSubject<number>(0);
  private dataUpdatedSubject = new BehaviorSubject<void | null>(null);

  public loading$ = this.loadingSubject.asObservable();
  public totalElements$ = this.totalElementsSubject.asObservable();
  public dataUpdated$ = this.dataUpdatedSubject.asObservable();
  data: StockItem[] = [];
  apiService: any;
  sort: any;

  constructor(private stockService: MyStockService) {
    super();
  }

  connect(collectionViewer: CollectionViewer): Observable<StockItem[]> {
    return this.dataSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.dataSubject.complete();
    this.loadingSubject.complete();
    this.totalElementsSubject.complete();
    this.dataUpdatedSubject.complete();
  }

  public getTotalElements(): Observable<number> {
    return this.totalElementsSubject.asObservable();
  }


  loadData(page: number, pageSize: number): Observable<void> {
    this.loadingSubject.next(true);
    return this.stockService.getStockPage(page, pageSize).pipe(
      catchError(() => of({ content: [], totalElements: 0 })),
      finalize(() => {
        this.loadingSubject.next(false);
        this.dataUpdatedSubject.next(null);
      }),
      tap((response: { content: StockItem[], totalElements: number }) => {
        this.dataSubject.next(response.content.map(item => ({
          ...item,
          supplierContent: item.supplierContent || {
            id: 0,
            sku: 'Sin proveedor',
            availableQuantity: 0,
            price: 0,
            updateDate: 'Sin proveedor',
            nickname: 'Sin proveedor'
          }
        })));
        this.totalElementsSubject.next(response.totalElements);
      }),
      map(() => void 0)
    );
  }

}
