import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ICategory } from '../Models/icategory';
import { CategoryViewModel } from '../ViewModels/category-view-model';

@Injectable({
  providedIn: 'root'
})
export class APICategoryService {

  httpHeader:{}
  constructor(private httpClient:HttpClient) {
    this.httpHeader= {
      header:new HttpHeaders({
        "ContentType":'application/json'
      })
    }
  }
  
  getAllCateogories():Observable<Array<CategoryViewModel>>{
    return this.httpClient.get<Array<CategoryViewModel>>(`${environment.APIUrl}/category`);
  }

}
