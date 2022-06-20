import { Component, OnInit } from '@angular/core';
import { bufferToggle } from 'rxjs';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {
  isshow=true;
  toggledisplay(){
    this.isshow=!this.isshow

  }

  constructor() { 
    
   
    
  }

  ngOnInit(): void {


   

    }
    
  }
  


