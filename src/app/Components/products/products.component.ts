import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { DiscountOffers } from 'src/app/Models/discount-offers';
import { Store } from 'ViewModels/Store';
import { ICategory } from 'src/app/Models/icategory';
import { IProduct } from 'src/app/Models/iproduct';
import { ProductViewModel } from 'ViewModels/ProductViewModel';
import { ProductViewM } from 'src/app/ViewModels/product-view-model';
import { ProductsService } from 'src/app/Services/products.service';
import { APIProductsService } from 'src/app/Services/apiproducts.service';
import { Subject, Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit, OnChanges, AfterViewInit, OnDestroy  {
  // Discount: DiscountOffers;
  // store: Store;
  // ClientName: String;
  ProductList: Array<IProduct>;
  ProductDetails:IProduct|undefined;
  ProductDetail:ProductViewM|undefined;
  //CategoryList: Array<ICategory>;
  userQuantity: number = 0;
  ProductListNew: Array<IProduct>;
  IsPurshased: boolean;
  ProductListVM: Array<ProductViewM>;
  ProductListViewModel: Array<ProductViewModel>;
  @Input() GetSelectedID: number;
  //CreditCard:String;
  //NationalID:number;
  @Output() AddToCart: EventEmitter<ProductViewModel>;

  Subscription:Array<Subscription>;
  constructor(private productService:ProductsService,
              private APIProductsService:APIProductsService,
              private router: Router
    ) {
    this.AddToCart = new EventEmitter<ProductViewModel>();
    // this.Discount = DiscountOffers['No Discount'];
    // this.ClientName = "Khaled";
    // this.store = new Store("Assiut Store", ["Assiut", "Minia"], "../../assets/Storelogo.png");
    this.ProductListNew = new Array<IProduct>();
    this.IsPurshased = true;
    this.ProductList = new Array<IProduct>();
    this.GetSelectedID = 0;
    this.ProductListVM=[]
    this.ProductListViewModel=[]
    // this.CreditCard="0000000000000000";
    // this.NationalID=29909011509345;
    //todayDate: Date = new Date();

    // this.ProductList.push(
    //   {
    //     CateogryID: 1,
    //     ID: 1,
    //     Img: "../../assets/productcard.jpg",
    //     Name: "iPhone 11",
    //     Price: 120,
    //     Quantity: 0,
    //     CreationDate: new Date()
    //   }
    // );
    // this.ProductList.push(
    //   {
    //     CateogryID: 1,
    //     ID: 2,
    //     Img: "../../assets/productcard.jpg",
    //     Name: "iPhone 12",
    //     Price: 100,
    //     Quantity: 1,
    //     CreationDate: new Date()
    //   }
    // );
    // this.ProductList.push(
    //   {
    //     CateogryID: 1,
    //     ID: 3,
    //     Img: "../../assets/productcard.jpg",
    //     Name: "iPhone 13",
    //     Price: 150,
    //     Quantity: 20,
    //     CreationDate: new Date()
    //   }
    // );
    // this.ProductList.push(
    //   {
    //     CateogryID: 2,
    //     ID: 4,
    //     Img: "../../assets/productcard.jpg",
    //     Name: "Digital cameras",
    //     Price: 100,
    //     Quantity: 1,
    //     CreationDate: new Date()
    //   }
    // );
    // this.ProductList.push(
    //   {
    //     CateogryID: 2,
    //     ID: 5,
    //     Img: "../../assets/productcard.jpg",
    //     Name: "LCD monitors",
    //     Price: 150,
    //     Quantity: 0,
    //     CreationDate: new Date()
    //   }
    // );

    // this.CategoryList = new Array<ICategory>();
    // this.CategoryList.push(
    //   {
    //     ID:1,
    //     Name:"IPhone"
    //   }
    // );
    // this.CategoryList.push(
    //   {
    //     ID:2,
    //     Name:"Samsung"
    //   }
    // );
    this.Subscription=[]
    this.Subscription.push(this.APIProductsService.getAllProducts().subscribe(productList=>{
      this.ProductListVM = productList;
    }))
  }
  ngOnDestroy(): void {
    this.Subscription[0].unsubscribe();
  }
  ngAfterViewInit(): void {

  }
  ngOnChanges(changes: SimpleChanges): void {
    if (this.GetSelectedID == 0) {  
      //this.ProductListNew = this.ProductList;
      //this.ProductListNew = this.productService.Get()
      this.APIProductsService.getAllProducts().subscribe(productList=>{
        this.ProductListVM = productList;
      })
    } else {
      this.APIProductsService.getAllProductsByCategoryID(this.GetSelectedID).subscribe(productList=>{
        this.ProductListVM = productList;
      })
      //this.ProductListNew = this.productService.GetProductsByCategoryID(this.GetSelectedID);
      //this.ProductListNew = this.ProductList.filter((p => p.CateogryID == this.GetSelectedID));
    }
  }

  ngOnInit(): void {
    //this.ProductListNew = this.productService.Get();
    this.APIProductsService.getAllProducts().subscribe(productList=>{
      this.ProductListVM = productList;
    });
  }
  Display(id: number) {
    //const li=event?.target;
    console.log(id);
    this.IsPurshased = true;
    //this.ProductListNew = this.productService.GetProductsByCategoryID(this.GetSelectedID);
    this.APIProductsService.getAllProductsByCategoryID(this.GetSelectedID).subscribe(productList=>{
      this.ProductListVM = productList;
    })
  }
  selection(event: Event) {
    console.log(event.target);
    this.IsPurshased = true;
    // this.ProductListNew = this.productService.GetProductsByCategoryID(this.GetSelectedID);
    this.APIProductsService.getAllProductsByCategoryID(this.GetSelectedID).subscribe(productList=>{
      this.ProductListVM = productList;
    })
  }
  Buy(id: number) {
    this.IsPurshased = !this.IsPurshased;
    let itemIndex = this.ProductList.findIndex(item => item.ID == id);
    //this.ProductList[itemIndex].Quantity -=1 ;
    console.log((this.ProductList.find(p => p.ID == id)?.Quantity));
  }

  UpdateUserCart(id: number, Name: String, Price: number, userQuantity: number, Quantity: number) {
    //Emit Event
    console.log(userQuantity);
    console.log(this.userQuantity);
    this.AddToCart.emit(new ProductViewModel(id, Name, Quantity, Price, userQuantity));
    console.log(new ProductViewModel(id, Name, Price, Quantity, userQuantity))
  }
  Details(ID:number){
    this.ProductDetails=this.productService.GetByID(ID);
    this.APIProductsService.getProductByID(ID).subscribe(product=>{
      this.ProductDetail=product;
    })
  }

  Edit(id:number){
    this.router.navigate(['/Products/Edit',id])
  }

  Delete(id:number){
    if(confirm("Are you sure to delete")){
      this.APIProductsService.deleteProduct(id).subscribe(product=>{
        console.log("Done");
        this.APIProductsService.getAllProducts().subscribe(products=>{
          this.ProductListVM=products;
        })
      })
    }
  }
}
