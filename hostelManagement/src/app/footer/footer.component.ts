import { Component,ElementRef , OnInit,ViewChild  } from '@angular/core';

@Component({
  selector: 'hostel-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  email = "info@heraldhostel.np";
  userName = "heraldhostel";
  
  constructor() { }
  scrollToDetailSection():void{
    const girlsRoomSection=document.getElementById('girls-section');
    if(girlsRoomSection){
      girlsRoomSection.scrollIntoView({behavior:'smooth'});
    }
  }

  ngOnInit(): void {
  }

}
