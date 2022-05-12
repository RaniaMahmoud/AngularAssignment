import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
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
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ProductDialogComponent } from '../product-dialog/product-dialog.component';
import { DataService } from 'src/app/Services/data.service';
import { APIUsersService } from 'src/app/Services/apiusers.service';
import { CardViewModel } from 'src/app/ViewModels/Card-view-model';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent
  implements OnInit, OnChanges, AfterViewInit, OnDestroy
{
  // Discount: DiscountOffers;
  // store: Store;
  // ClientName: String;
  displayedColumns = ['Image', 'name', 'price', 'Quantity', 'count', 'Add'];
  ProductList: Array<IProduct>;
  ProductDetails: IProduct | undefined;
  ProductDetail: ProductViewM | undefined;
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

  Subscription: Array<Subscription>;
  CardItem: number;
  card : CardViewModel[];
  CardProducts:CardViewModel[];
  constructor(
    private productService: ProductsService,
    private APIProductsService: APIProductsService,
    private APIUserService: APIUsersService,
    private router: Router,
    private matDialog: MatDialog,
    private dataService: DataService
  ) {
    this.AddToCart = new EventEmitter<ProductViewModel>();
    this.ProductListNew = new Array<IProduct>();
    this.IsPurshased = true;
    this.ProductList = new Array<IProduct>();
    this.GetSelectedID = 0;
    this.ProductListVM = [];
    this.CardProducts=[];
    this.ProductListViewModel = [];
    this.card=[];
    if (localStorage.getItem('CardItems') === null) {
      this.CardItem = 1;
    } else {
      this.CardItem = parseInt(localStorage.getItem('CardItems')!) + 1;
    }
    this.Subscription = [];
    this.Subscription.push(
      this.APIProductsService.getAllProducts().subscribe((productList) => {
        this.ProductListVM = productList.filter(p=>p.Quantity>0);
      })
    );
  }
  ngOnDestroy(): void {
    this.Subscription[0].unsubscribe();
  }
  ngAfterViewInit(): void {}
  ngOnChanges(changes: SimpleChanges): void {
    if (this.GetSelectedID == 0) {
      console.log('WHAT');
      this.APIProductsService.getAllProducts().subscribe((productList) => {
        console.log('PRO');
        this.ProductListVM = productList.filter(p=>p.Quantity>0);
      });
    } else {
      console.log(this.GetSelectedID);
      this.APIProductsService.getAllProductsByCategoryID(
        this.GetSelectedID
      ).subscribe((productList) => {
        this.ProductListVM = productList.filter(p=>p.Quantity>0);
      });
    }
  }

  ngOnInit(): void {
    //this.ProductListNew = this.productService.Get();

    this.APIProductsService.getAllProducts().subscribe((productList) => {
      this.ProductListVM = productList.filter(p=>p.Quantity>0);
    });
  }
  Display(id: number) {
    //const li=event?.target;
    console.log(id);
    this.IsPurshased = true;
    console.log(this.GetSelectedID);
    //this.ProductListNew = this.productService.GetProductsByCategoryID(this.GetSelectedID);
    this.APIProductsService.getAllProductsByCategoryID(
      this.GetSelectedID
    ).subscribe((productList) => {
      this.ProductListVM = productList;
    });
  }
  selection(event: Event) {
    console.log(event.target);
    this.IsPurshased = true;
    // this.ProductListNew = this.productService.GetProductsByCategoryID(this.GetSelectedID);
    this.APIProductsService.getAllProductsByCategoryID(
      this.GetSelectedID
    ).subscribe((productList) => {
      this.ProductListVM = productList;
    });
  }
  Buy(id: number,Name: string,Quantity: number,Price: number,Image:string,
    QuantityOfProduct:number) {
    let IsExist=false;
    let card = {} as CardViewModel;
      card.ProductQuantity = 
      {    
        ProductID: id,
        Quantity: Quantity,
      };
      card.TotalPrice=Price*Quantity;
      console.log(card.ProductQuantity);
      card.TotalPrice=Price*Quantity;
      card.Price=Price;
      card.Image=Image;
      card.QuantityOfProduct=QuantityOfProduct;
      card.ProductName=Name;
      card.ProductID=id;
      console.log(card);
      if (localStorage.getItem('Card') === null) {
        localStorage.setItem("Card", JSON.stringify(this.card));
      } else {
        //let ListOfItems = [];
        this.CardProducts = JSON.parse(localStorage.getItem("Card")!);
        this.CardProducts.map(c=>{
          if(c.ProductID == id){
            c.ProductQuantity!.Quantity += 1;
            IsExist=true;
            console.log("IN")
          }
        })
      }
      
      this.card.push(card);
      if (localStorage.getItem('CardItems') === null) { 
        localStorage.setItem("Card", JSON.stringify(this.card));
        localStorage.setItem('CardItems', this.CardItem.toString());
      } else {
        if(IsExist){
          console.log("here");
          localStorage.setItem("Card", JSON.stringify(this.CardProducts));
        }else{
          localStorage.setItem("Card", JSON.stringify(this.card));
          localStorage.setItem(
            'CardItems',
            (parseInt(localStorage.getItem('CardItems')!) + 1).toString()
          );
        }
      }
      this.dataService.setProduct();
    // if(environment.ISLogin){
      
    // }else{
    //   this.router.navigate(['/Login']);
    // }
  }

  UpdateUserCart(
    id: number,
    Name: String,
    Price: number,
    userQuantity: number,
    Quantity: number
  ) {
    //Emit Event
    console.log(userQuantity);
    console.log(this.userQuantity);
    this.AddToCart.emit(
      new ProductViewModel(id, Name, Quantity, Price, userQuantity)
    );
    console.log(new ProductViewModel(id, Name, Price, Quantity, userQuantity));
  }
  Details(ID: number) {
    this.ProductDetails = this.productService.GetByID(ID);
    this.APIProductsService.getProductByID(ID).subscribe((product) => {
      this.ProductDetail = product;
    });
  }

  Edit(id: number) {
    this.router.navigate(['/Products/Edit', id]);
  }

  Delete(id: number) {
    if (confirm('Are you sure to delete')) {
      this.APIProductsService.deleteProduct(id).subscribe((product) => {
        console.log('Done');
        this.APIProductsService.getAllProducts().subscribe((products) => {
          this.ProductListVM = products;
        });
      });
    }
  }

  ProductDetaile(id: number) {
    const dialogConfig = new MatDialogConfig();
    this.APIProductsService.getProductByID(id).subscribe((product) => {
      this.ProductDetail = product;
      dialogConfig.data = {
        id: product.id,
        Name: product.Name,
        Price: product.Price,
        Quantity: product.Quantity,
        CreationDate: product.CreationDate,
        Image: product.Image,
      };
      this.matDialog.open(ProductDialogComponent, dialogConfig);
    });
  }
}
