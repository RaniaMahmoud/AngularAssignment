import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IProduct } from 'src/app/Models/iproduct';
import { ProductsService } from 'src/app/Services/products.service';
import { Location } from '@angular/common';
import { APIProductsService } from 'src/app/Services/apiproducts.service';
import { ProductViewM } from 'src/app/ViewModels/product-view-model';


@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit{
  Product:IProduct|undefined;
  ProductViewM:ProductViewM|undefined;
  currentID:number=0;
  IDsOfProducts:number[]=[]
  constructor(private getroute:ActivatedRoute,
              private productService:ProductsService,
              private APIProductsService:APIProductsService,
              private location:Location,
              private router: Router
              ) {}

  ngOnInit(): void {
    this.IDsOfProducts=this.productService.GetAPIProductsIDs();
    this.getroute.paramMap.subscribe(item=>{
      this.currentID=Number(item.get("id"));
      console.log(this.currentID)
      //this.Product=this.productService.GetByID(this.currentID);
      this.APIProductsService.getProductByID(this.currentID).subscribe(product=>{
        this.ProductViewM=product;
      })
      console.log(this.Product);
    });
  }

  GoBackToPage(){
    this.location.back();
  }

  PrevProduct(){
    let ProductIndex:number = this.IDsOfProducts.findIndex(item => item == this.currentID);
    if(ProductIndex !=0 ){
      this.currentID=this.IDsOfProducts[ProductIndex-1];
      this.router.navigate(['/Products',this.currentID]);
    }
  }

  NextProduct(){
    let ProductIndex:number = this.IDsOfProducts.findIndex(item => item == this.currentID);
    if(ProductIndex < this.IDsOfProducts.length - 1 ){
      this.currentID=this.IDsOfProducts[ProductIndex + 1];
      this.router.navigate(['/Products',this.currentID]);
    }
  }

  Next(){
    if(this.currentID == this.IDsOfProducts[this.IDsOfProducts.length - 1]){
      return true;
    }else
      return false;
  }

  Prev(){
    if(this.currentID == this.IDsOfProducts[0]){
      return true;
    }else
      return false;
  }
}
