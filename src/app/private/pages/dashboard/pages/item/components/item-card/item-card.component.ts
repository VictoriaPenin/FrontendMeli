import { Component, OnInit } from '@angular/core';
import { MyPublicationsService } from '../../../../../../services/MyPublicationsService.service';
import { ActivatedRoute } from '@angular/router';
import { UpperCasePipe } from '@angular/common';

@Component({
  selector: 'app-item-card',
  standalone: true,
  imports: [UpperCasePipe],
  templateUrl: './item-card.component.html',
  styleUrl: './item-card.component.scss'
})
export class ItemCardComponent implements OnInit{

  data:any
  id:String = "";
  actionHealth ="";

  constructor(private service: MyPublicationsService ,private route: ActivatedRoute){}

  ngOnInit(): void {
    const url = this.route.snapshot.url.join('/');
        const segments = url.split('/');
        // Obtener el último segmento de la URL
        this.id = segments[segments.length - 1];
    this.service.getOneItem(this.id).subscribe(x =>{
      this.data = x;
    })
    this.service.getHealthActions(this.id).subscribe(x=>{
      this.actionHealth = x.curatedMessage;
      console.log(this.actionHealth)
    })
}



}
