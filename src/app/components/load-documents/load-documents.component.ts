import { AfterViewInit, Component, OnInit, ViewChild, ElementRef, AfterContentInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UtilService } from 'src/app/services/util.service';
import {BreakpointObserver} from '@angular/cdk/layout';
import {  fromEvent } from 'rxjs';
import { map } from "rxjs/operators";

@Component({
  selector: 'app-load-documents',
  templateUrl: './load-documents.component.html',
  styleUrls: ['./load-documents.component.css']
})
export class LoadDocumentsComponent implements OnInit, AfterContentInit {
  docType : string = "All";
  docList : any = [];
  cols : number = 4;
  //HTML Reference to Search Input
  @ViewChild('docSearchInput', { static: true }) docSearchInput!: ElementRef;
  constructor(private router : ActivatedRoute, private utils : UtilService, private breakpoint : BreakpointObserver) { }
  ngOnInit(): void {
    this.router.paramMap.subscribe(params => { 
      this.docType = params.get('type') || "All";
      //Load Documents By Type based on the params.
      this.loadDocsByType();     
      //Handle Document Search by document name.
      this.searchDocuments();    

    })
  }
  //After View Init call to check the breakpoint of the device.
  ngAfterContentInit() {
    setTimeout(() => {
      this.breakpoint.observe(['(max-width: 720px)']).subscribe((res) => {
        if (res.matches) {
          this.cols = 1; //1 tile for mobile.
        } else {
          this.cols = 4;
        }
      });
    })    
  }
  //Search Documents by Document Name
  searchDocuments() {
    fromEvent(this.docSearchInput.nativeElement, 'keyup').pipe(
      // get value
      map((event: any) => {
        return event.target.value;
      })
      // subscription for response
    ).subscribe((text: string) => {
      this.utils.getDocsByName(text, this.docType).subscribe((docs) => {
        this.docList = docs;        
      })

    });
  
  }
  //Load Documents By Type.
  loadDocsByType() {
    this.utils.getDocsByType(this.docType).subscribe(docs => {
      this.docList = docs;
    });
  }  
}
