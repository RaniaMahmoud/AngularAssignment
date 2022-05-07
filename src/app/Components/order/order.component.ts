import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { DiscountOffers } from 'src/app/Models/discount-offers';
import { ICategory } from 'src/app/Models/icategory';
import { APICategoryService } from 'src/app/Services/apicategory.service';
import { APIProductsService } from 'src/app/Services/apiproducts.service';
import { ProductsService } from 'src/app/Services/products.service';
import { CategoryViewModel } from 'src/app/ViewModels/category-view-model';
import { ProductViewM } from 'src/app/ViewModels/product-view-model';
import { ProductViewModel } from 'ViewModels/ProductViewModel';
import { Store } from 'ViewModels/Store';
import { ProductsComponent } from '../products/products.component';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit, AfterViewInit {
  Discount: DiscountOffers;
  store: Store;
  ClientName: String;
  //CategoryList: Array<ICategory>;
  CategoryList!: Array<CategoryViewModel>;
  IsPurshased: boolean;
  SelectedID: number;
  CreditCard: String;
  NationalID: number;
  ProductViewModel: Array<ProductViewModel>;
  ProductViewM: Array<ProductViewM>;
  TotalPrice: number = 0;
  @ViewChild(ProductsComponent) elementRef!: ProductsComponent;
  @ViewChild('SelectedID') SelectedProductID!: ElementRef;

  constructor(private productService:ProductsService,
              private APICategoryService:APICategoryService,
              private APIProductService:APIProductsService
              ) {
    this.Discount = DiscountOffers['No Discount'];
    this.ClientName = "Khaled";
    this.store = new Store("Assiut Store", ["Assiut", "Minia"], "../../assets/Storelogo.png");
    this.IsPurshased = true;
    this.SelectedID = 0;
    this.CreditCard = "0000000000000000";
    this.NationalID = 29909011509345;
    this.ProductViewModel = []
    this.ProductViewM=[];
    //this.CategoryList = new Array<ICategory>();
    this.APICategoryService.getAllCateogories().subscribe(categoryList=>{
      console.log(categoryList);
      this.CategoryList=categoryList;
      console.log(this.CategoryList);
    });
    // this.CategoryList.push(
    //   {
    //     ID: 1,
    //     Name: "IPhone"
    //   }
    // );
    // this.CategoryList.push(
    //   {
    //     ID: 2,
    //     Name: "Samsung"
    //   }
    // );
  }
  
  ngAfterViewInit(): void {
    console.log(this.SelectedID)
  }

  ngOnInit(): void {
  }

  selection(event: Event) {
    console.log(event.target);
    this.IsPurshased = true;
  }

  UpdateUserCart(Produt: ProductViewModel) {
    // let flag = false;
    // this.ProductViewModel.forEach(item => {
    //   if (item.ID == Produt.ID) {
    //     console.log("Item.ID = " + item.ID + " PID =" + Produt.ID);
    //     flag = true;
    //   }
    // })
    let isExist=this.IsExist(Produt.ID);
    console.log("Find " + isExist);
    if (!isExist) {
      // this.ProductViewModel.push(Produt);
      // this.TotalPrice += Produt.Price * Produt.UserQ;
      this.TotalPrice += this.productService.AddInCart(Produt);
      this.ProductViewModel=this.productService.ProductViewModel;
      ////this.OnQuantityChange(Produt.UserQ,Produt.Price);
      //console.log("Product " + this.ProductViewModel[0].Name)
    } else {
      alert("This Item In Your Cart");
    }
    // else{
    //   this.ProductViewModel.some(item=>{
    //     if(item.ID==Produt.ID){
    //       item.UserQ+=Produt.UserQ;
    //       this.OnQuantityChange(Produt.UserQ,Produt.Price);
    //     }
    //   }
    //   );
    // }
  }
  
  Done() {
    // this.ProductViewModel.forEach(item => {
    //   console.log("Out item.Quantity " + item.Quantity + " item.UserQ " + item.UserQ + "  ID " + item.ID);
    // })
    // this.ProductViewModel.find(item => {
    //   this.elementRef.ProductListNew.forEach(pro => {
    //     console.log("Out item.Quantity " + item.Quantity + " item.UserQ " + item.UserQ + " pro.ID " + pro.ID + " pro.Quantity " + pro.Quantity + "  ID " + item.ID);
    //     if (pro.ID == item.ID) {
    //       pro.Quantity -= item.UserQ;
    //       console.log("IN item.Quantity " + item.Quantity + " item.UserQ " + item.UserQ + " pro.ID " + pro.ID + " pro.Quantity " + pro.Quantity + "  ID " + item.ID);
    //     }
    //   })
    // })
    // this.ProductViewModel = [];
    this.productService.CheckOut(this.elementRef);
    this.ProductViewModel = this.productService.ProductViewModel;
    this.TotalPrice = 0;
  }
  
  Remove(ID: number) {
    // let ProductViewModel: Array<ProductViewModel> = [];
    // ProductViewModel = this.ProductViewModel.filter(p => p.ID != ID);
    this.ProductViewModel = this.productService.RemoveUserOrderList(ID);
    this.TotalPrice = 0;
    this.TotalPrice = this.productService.CalcTotalPrice(this.ProductViewModel);
    // this.ProductViewModel.forEach(item => {
    //   this.TotalPrice += (item.UserQ * item.Price);
    // });
  }

  OnQuantityChange(ID: number,QuantityUser:number) {
    this.TotalPrice = this.productService.QuantityChange(ID,QuantityUser);
    this.ProductViewModel=this.productService.ProductViewModel;
  }

  IsExist(ID:number){
    let isExist:Boolean=false;
    this.ProductViewModel.forEach(item => {
      if (item.ID == ID) {
        isExist = true;
      }
    })
    return isExist;
  }
}
