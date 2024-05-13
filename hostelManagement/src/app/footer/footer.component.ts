import { Component,ElementRef , OnInit,ViewChild  } from '@angular/core';

@Component({
  selector: 'hostel-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  email = "dawatmng16@gmail.com";
  userName = "dawatamang";
  
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
