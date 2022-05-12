import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { OrderVM } from '../ViewModels/Order-view-model';
import { ProductViewM } from '../ViewModels/product-view-model';

@Injectable({
  providedIn: 'root'
})
export class APIProductsService {

  private httpOptions;
  constructor(private httpClient: HttpClient) {
    this.httpOptions={
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
  }

  getAllProducts():Observable<ProductViewM[]>{
    return this.httpClient.get<ProductViewM[]>(`${environment.APINewURL}/Products`);
  }
  getAllProductsByCategoryID(categoryID:number):Observable<ProductViewM[]>{
    return this.httpClient.get<ProductViewM[]>(`${environment.APINewURL}/Products/Category?CateogryID=${categoryID}`);
  }
  getProductByID(pID:number):Observable<ProductViewM>{
    return this.httpClient.get<ProductViewM>(`${environment.APINewURL}/Products/${pID}`)
  }
  addProduct(productvm:ProductViewM):Observable<ProductViewM>{
    console.log("befourADD "+JSON.stringify(productvm))

    return this.httpClient.post<ProductViewM>(`${environment.APINewURL}/Products`, JSON.stringify(productvm), this.httpOptions);
  }

  Upload(formData:FormData):Observable<ProductViewM>{
    console.log("file "+formData.get('file'));
    return this.httpClient.post<ProductViewM>(`${environment.APINewURL}/Products`, formData, {reportProgress: true});
  }

  updateProduct(ID: number, formData:FormData):Observable<ProductViewM>
  {
    console.log("befourEdit "+ formData.get('file'))
    return this.httpClient.patch<ProductViewM>(`${environment.APINewURL}/Products/${ID}`, formData, {reportProgress: true});
  }

  deleteProduct(ID:number):Observable<ProductViewM>
  {
    return this.httpClient.delete<ProductViewM>(`${environment.APINewURL}/Products/${ID}`,this.httpOptions);
  }

  OrderProduct(order:OrderVM):Observable<OrderVM>
  {
    return this.httpClient.post<OrderVM>(`${environment.APINewURL}/Products/Order`, JSON.stringify(order),this.httpOptions);
  }
}
