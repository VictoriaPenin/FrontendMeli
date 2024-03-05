import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { CostService } from '../../../../../services/cost.service';
import { CostResponse } from '../../../../../Interfaces/Responses';


export class MyDataCost extends DataSource<CostResponse> {
    private dataSubject = new BehaviorSubject<any[]>([]);
    private loadingSubject = new BehaviorSubject<Boolean>(false);
    private totalElementsSubject = new BehaviorSubject<number>(0);
    public loading$ = this.loadingSubject.asObservable();
    public totalElements$ = this.totalElementsSubject.asObservable();

    constructor(private costService: CostService) {
        super();
    }

    override connect(collectionViewer: CollectionViewer): Observable<CostResponse[]> {
        return this.dataSubject.asObservable();
    }
    override disconnect(collectionViewer: CollectionViewer): void {
        this.dataSubject.complete();
        this.loadingSubject.complete();
    }

    loadData(page:number, pageSize:number) {
        this.loadingSubject.next(true);
        this.costService.getCostPage(page, pageSize).pipe(
            catchError(() => of ({ content: [], totalElements: 0 })),
            finalize(() => this.loadingSubject.next(false))
        )
            .subscribe(Response => {
                this.dataSubject.next(Response.content);
                this.totalElementsSubject.next(Response.totalElements)
            });
    }

    getTotalElements(): Observable<number> {
        return this.totalElementsSubject.asObservable();
    }
}