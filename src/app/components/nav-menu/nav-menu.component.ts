import { AfterContentInit, Component, OnInit } from '@angular/core';
import {BreakpointObserver} from '@angular/cdk/layout';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent implements OnInit, AfterContentInit {
  public isMobileLayout = false;
  constructor(private observer: BreakpointObserver, private utils : UtilService) { }
  list : any = [];
  activeLink : string = "";
  ngOnInit(): void {
    this.list = this.utils.getAllMenus();
    this.activeLink = (this.list.length > 0) ? this.list[0] : "";
  }
  //To Check Mobile Layout
  ngAfterContentInit() {
    this.observer.observe(['(max-width: 720px)']).subscribe((res) => {
      if (res.matches) {
        this.isMobileLayout = true;
      } else {
        this.isMobileLayout = false;
      }
    });
  }

}
