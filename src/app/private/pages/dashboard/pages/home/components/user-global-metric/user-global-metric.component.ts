import { Component, Input } from '@angular/core';
import {MatSelectModule} from '@angular/material/select';
import {MatButtonModule} from '@angular/material/button';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import { MetricsUser } from '../../../../../../Interfaces/Metrics';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-user-global-metric',
  standalone: true,
  imports: [MatSelectModule,
    MatButtonModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatCardModule,
    NgClass
  ],
  templateUrl: './user-global-metric.component.html',
  styleUrl: './user-global-metric.component.scss'
})
export class UserGlobalMetricComponent {
@Input()
public metricas:MetricsUser | undefined




}
