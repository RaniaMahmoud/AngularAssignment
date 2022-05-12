import { Component, OnInit } from '@angular/core';
import {
  AfterViewInit,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
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
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.scss']
})
export class AllProductsComponent implements OnInit {
  displayedColumns = ['Image', 'name', 'price', 'Quantity','Details','Edit','Delete'];
  ProductListVM: Array<ProductViewM>;
  Subscription: Array<Subscription>;
  ProductDetails: IProduct | undefined;
  ProductDetail: ProductViewM | undefined;
  constructor(
    private productService: ProductsService,
    private APIProductsService: APIProductsService,
    private APIUserService: APIUsersService,
    private router: Router,
    private matDialog: MatDialog,
    private dataService: DataService
  ) {
    this.ProductListVM = [];
    this.Subscription = [];
    this.Subscription.push(
      this.APIProductsService.getAllProducts().subscribe((productList) => {
        this.ProductListVM = productList.filter(p=>p.Quantity>0);
      })
    );
  }
  ngOnInit(): void {
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
