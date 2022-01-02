import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title="eclass-angular";
  
  public href: string = "";
  constructor(private router: Router){}
  ngOnInit() {
    this.href = this.router.url;
    console.log(this.router.url);
   // alert(this.router.navigate.toString.length);
}

@HostListener('window:beforeunload')
  async ngOnDestroy()
  {
   if(localStorage.getItem('remember-me')=='false'){
    localStorage.clear();
 
   } 
  }

  
}

