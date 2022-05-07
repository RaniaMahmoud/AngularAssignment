import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { empty, isEmpty } from 'rxjs';
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
  url : any;
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
  //fileToUpload=[];
  file = {} as File;
  constructor(private APIProductsService:APIProductsService,
    private APICategoryService:APICategoryService,
    private router: Router,
    private getroute:ActivatedRoute
    ) {
      this.id='';
      this.url="";
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
  readUrl(event:any) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      console.log("in")
      reader.onload = (event: ProgressEvent) => {

        this.url = (<FileReader>event.target).result;
        //this.ProductViewM.file = this.url;
      }
      reader.readAsDataURL(event.target.files[0]);
    }
  }
  uploadFile = (files:any) => {
    console.log("FILESS "+files[0].stream());
    this.file=files[0];
    console.log(this.file);
    if (files.length === 0) {
      return;
    }
  }

  AddNewProduct(){
    console.log(this.ProductViewM);
    let fileToUpload = this.file;
    const formData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);
    formData.append('product', JSON.stringify(this.ProductViewM));
    this.APIProductsService.Upload(formData).subscribe(
      product=>{
        console.log(product);
        this.router.navigate(['/Order'])
      }
    );

    //console.log(this.ProductViewM.file);
    // this.fileToUpload = this.ProductViewM.file;
    // const formData = new FormData();
    // formData.append('file', this.fileToUpload, this.fileToUpload.name);
    // this.APIProductsService.addProduct(this.ProductViewM).subscribe(product=>{
    //   console.log("ADD "+product);
    // })
  }

  EditProduct(id: number) {
    const formData = new FormData();
    console.log("Done");
    console.log(this.ProductViewM);
    let fileToUp = this.file;
    console.log(fileToUp.size);
    if (fileToUp.size != undefined) {
      formData.append('file', fileToUp, fileToUp.name);
    }
    formData.append('product', JSON.stringify(this.ProductViewM));
    this.APIProductsService.updateProduct(id, formData).subscribe(product => {
        console.log("Edit " + product);
        this.router.navigate(['/Order'])
    });
  }

}
