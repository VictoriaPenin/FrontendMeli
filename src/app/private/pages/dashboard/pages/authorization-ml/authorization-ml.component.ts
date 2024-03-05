import { Component, OnInit } from '@angular/core';
import { UserServiceService } from '../../../../services/UserService.service';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-authorization-ml',
  standalone: true,
  imports: [MatButtonModule],
  templateUrl: './authorization-ml.component.html',
  styleUrl: './authorization-ml.component.scss'
})
export class AuthorizationMlComponent implements OnInit {
  complete:boolean= false;
  constructor(private userService:UserServiceService,private route: ActivatedRoute){}
  
  
  ngOnInit(): void {
    this.sendTG();
    
  }
  sendTG(){
    const authorizationCode = this.route.snapshot.queryParams['code'];

    if (authorizationCode) {
      this.userService.sendAuthorizationCode(authorizationCode)
        .subscribe(response => {
          console.log(response);
          this.complete = true;
        });
    }
  }
}
