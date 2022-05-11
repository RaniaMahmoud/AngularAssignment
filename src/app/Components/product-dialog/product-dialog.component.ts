import { Component, Inject, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import {
  MAT_DIALOG_DATA
} from "@angular/material/dialog";
import { APIProductsService } from 'src/app/Services/apiproducts.service';
import { ProductViewM } from 'src/app/ViewModels/product-view-model';
@Component({
  selector: 'app-product-dialog',
  templateUrl: './product-dialog.component.html',
  styleUrls: ['./product-dialog.component.scss'],
})

export class ProductDialogComponent implements OnInit {
  ProductViewM:ProductViewM|undefined;
  constructor(public dialogRef: MatDialogRef<ProductDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: number,
    private APIProductsService:APIProductsService) {
      console.log(this.data);
      this.APIProductsService.getProductByID(this.data).subscribe(product=>{
        this.ProductViewM = product;
        console.log(this.ProductViewM);
      });
  }
  ngOnInit(): void {
  }
  close() {
    this.dialogRef.close('Thanks for using me!');
  }
}
