import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { APICategoryService } from 'src/app/Services/apicategory.service';
import { APIProductsService } from 'src/app/Services/apiproducts.service';
import { CategoryViewModel } from 'src/app/ViewModels/category-view-model';
import { ProductViewM } from 'src/app/ViewModels/product-view-model';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.scss'],
  
})
export class NewProductComponent implements OnInit {
  ProductViewM={} as ProductViewM;
  categoryList:CategoryViewModel[];
  Exist=false;
  //currentID:number;
  id: string;
  isAddMode: boolean;
                  // this.ProductViewM={
                //   id: 5,
                //   Name:'Iphone 6x',
                //   Quantity:50,
                //   Price:10,
                //   Img:'1.jpg',
                //   CateogryID:1,
                // }

  constructor(private APIProductsService:APIProductsService,
    private APICategoryService:APICategoryService,
    private router: Router,
    private getroute:ActivatedRoute
    ) { 
      this.id='';
      this.isAddMode=false;
      this.categoryList=[];
      this.APICategoryService.getAllCateogories().subscribe(categories=>{
        this.categoryList=categories;
      })
  }

  ngOnInit(): void {
    this.id = this.getroute.snapshot.params['id'];
    this.isAddMode = !this.id;
    if(!this.isAddMode){
      console.log("IDINValid");
      this.APIProductsService.getProductByID(Number(this.id)).subscribe(product=>{
        this.ProductViewM=product;
        console.log("IDIN");
      })
    }
    else{
      console.log("Not")
    }
  }
  
  Check(){
    if(!this.isAddMode){
      console.log("IDINValid");
      this.EditProduct(Number(this.id));
    }else{
      this.AddNewProduct();
    }
    
  }

  AddNewProduct(){
    console.log(this.ProductViewM);
    this.APIProductsService.addProduct(this.ProductViewM).subscribe(product=>{
      console.log(product);
      this.router.navigate(['/Order'])
    })
  }

  EditProduct(id:number){
    console.log("Done");
    this.APIProductsService.updateProduct(id,this.ProductViewM).subscribe(product=>{
      console.log(product);
      this.router.navigate(['/Order'])
    })
    
  }
}
