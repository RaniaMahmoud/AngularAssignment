import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { APIProductsService } from 'src/app/Services/apiproducts.service';
import { ProductViewM } from 'src/app/ViewModels/product-view-model';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ProductDialogComponent } from '../product-dialog/product-dialog.component';

@Component({
  selector: 'app-show-product',
  templateUrl: './show-product.component.html',
  styleUrls: ['./show-product.component.scss'],
})
export class ShowProductComponent implements OnInit, OnChanges {
  ProductListVM: Array<ProductViewM>;
  constructor(
    private APIProductsService: APIProductsService,
    private matDialog: MatDialog
  ) {
    this.ProductListVM = [];
  }

  ngOnChanges(): void {}

  ngOnInit(): void {
    this.APIProductsService.getAllProducts().subscribe((productList) => {
      console.log('PRO');
      this.ProductListVM = productList;
    });
  }
  ProductDetails(id: number) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = id;
    this.matDialog.open(ProductDialogComponent, dialogConfig);
  }
}
