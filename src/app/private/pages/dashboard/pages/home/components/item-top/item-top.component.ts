import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { TopItem } from '../../../../../../Interfaces/Metrics';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-item-top',
  standalone: true,
  imports: [MatCardModule,
    MatButtonModule],
  templateUrl: './item-top.component.html',
  styleUrl: './item-top.component.scss'
})
export class ItemTopComponent {
  @Input()
  item:TopItem | undefined 

}
