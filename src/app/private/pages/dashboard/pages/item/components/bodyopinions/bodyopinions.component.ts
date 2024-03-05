import { Component, Input } from '@angular/core';
import { reviews } from '../../../../../../Interfaces/Opiniones';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-bodyopinions',
  standalone: true,
  imports: [NgClass],
  templateUrl: './bodyopinions.component.html',
  styleUrl: './bodyopinions.component.scss'
})
export class BodyopinionsComponent {
  @Input()
  reviews:reviews| undefined

}
