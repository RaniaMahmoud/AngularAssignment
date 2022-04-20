import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
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
    return this.httpClient.get<ProductViewM[]>(`${environment.APIUrl}/product`);
  }
  getAllProductsByCategoryID(categoryID:number):Observable<ProductViewM[]>{
    return this.httpClient.get<ProductViewM[]>(`${environment.APIUrl}/product?CateogryID=${categoryID}`);
  }
  getProductByID(pID:number):Observable<ProductViewM>{
    return this.httpClient.get<ProductViewM>(`${environment.APIUrl}/product/${pID}`)
  }
  addProduct(productvm:ProductViewM):Observable<ProductViewM>{
    console.log(JSON.stringify(productvm))
    return this.httpClient.post<ProductViewM>(`${environment.APIUrl}/product`,JSON.stringify(productvm),this.httpOptions);
  } 

  updateProduct(ID: number, Product: ProductViewM):Observable<ProductViewM>
  {
    console.log(JSON.stringify(Product))
    return this.httpClient.patch<ProductViewM>(`${environment.APIUrl}/product/${ID}`,JSON.stringify(Product),this.httpOptions);
  }

  deleteProduct(ID:number):Observable<ProductViewM>
  {
    return this.httpClient.delete<ProductViewM>(`${environment.APIUrl}/product/${ID}`,this.httpOptions);
  }
}
