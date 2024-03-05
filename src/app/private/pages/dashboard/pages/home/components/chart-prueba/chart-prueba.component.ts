import { Component, OnInit } from '@angular/core';
import { Chart, ChartConfiguration, ChartOptions } from 'chart.js';
import { NgChartsModule } from 'ng2-charts';

@Component({
  selector: 'app-chart-prueba',
  standalone: true,
  imports: [NgChartsModule],
  templateUrl: './chart-prueba.component.html',
  styleUrl: './chart-prueba.component.scss'
})
export class ChartPruebaComponent implements OnInit{
  title = 'ng2-charts-demo';

  public pieChartOptions: ChartOptions<'pie'> = {
    responsive: false,
  };
  public pieChartLabels = [ [ 'Ventas' ], [ 'Canceladas' ], 'Pausadas' ];
  public pieChartDatasets = [ {
    data: [ 300, 500, 100 ]
  } ];
  public pieChartLegend = true;
  public pieChartPlugins = [];


  constructor() {
  }

  ngOnInit() {
  }

 

}
