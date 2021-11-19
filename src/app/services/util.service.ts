import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators'; 
import { Document } from '../document';
import { AppConstants } from '../constants/constants';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class UtilService {
  constructor(private http: HttpClient) { }
  //Get All the menus to be populated
  getAllMenus() {
    return AppConstants.Menu;
  }
//Get documents based on type
 getDocsByType(docType: string) : Observable<Document[]> {
  return this.http.get<Document[]>(AppConstants.ApiUrl).pipe(
    map(result => {
      if (docType != AppConstants.AllType) {
        return result.filter(doc => doc.type.toLowerCase() === docType.toLowerCase());
      } else {
        return result;
      }
    }
    )
  )
 }
//Get Documents based on type & name
 getDocsByName(docName:string, docType:string): Observable<Document[]> {
   console.log(docName);
  return this.http.get<Document[]>(AppConstants.ApiUrl).pipe(
    map(result => {
      if(docType !== AppConstants.AllType) {
        return result.filter(doc => (doc.name.toLowerCase()).indexOf(docName.toLowerCase()) >-1 && doc.type.toLowerCase() === docType.toLowerCase());  
      } else {
        return result.filter(doc => (doc.name.toLowerCase()).indexOf(docName.toLowerCase()) >-1);
      }          
    }
    )
  )
 }
}

