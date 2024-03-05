import { Component, OnInit, inject } from '@angular/core';
import { UserServiceService } from '../../../../services/UserService.service';
import { UserGlobalMetricComponent } from "./components/user-global-metric/user-global-metric.component";
import {MatGridListModule} from '@angular/material/grid-list';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, map, of, shareReplay, switchMap } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { MetricsUser } from '../../../../Interfaces/Metrics';
import { TopItemCategorieComponent } from "./components/top-item-categorie/top-item-categorie.component";
import { ChartPruebaComponent } from "./components/chart-prueba/chart-prueba.component";

@Component({
    selector: 'app-home',
    standalone: true,
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss',
    imports: [UserGlobalMetricComponent,
        MatGridListModule,
        AsyncPipe, TopItemCategorieComponent, ChartPruebaComponent]
})
export class HomeComponent implements OnInit {
  private breakpointObserver = inject(BreakpointObserver);
  public metricsUser:MetricsUser | undefined;
 
  constructor(private userService:UserServiceService){

  }
  
  
  ngOnInit(): void {
    this.refreshtoke();
    this.globalMetricUser();
  }

  isSmall$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );
    
    cols$: Observable<number> = this.isSmall$.pipe(
      switchMap(isHandset => isHandset ? of(1) : of(2)) // Cambia el número de columnas según sea necesario
    );

  refreshtoke(){
    console.log("Refreshing token...");
    this.userService.refreshToken().subscribe(
      (data) => {
          console.log("Token refreshed successfully");
      },
      (error) => {
          console.error("Error refreshing token", error);
      }
  );

}
globalMetricUser(){
    this.userService.getGlobalMetricUser().subscribe(
      (data) => {
        this.metricsUser = data;
        console.log(data);
      },
      (error) => {
        console.error("Error en globalMetricUser()", error);
    }
    );
}

}
