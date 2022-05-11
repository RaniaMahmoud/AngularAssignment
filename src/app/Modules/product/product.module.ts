import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShowProductComponent } from 'src/app/Components/show-product/show-product.component';
import { RouterModule, Routes } from '@angular/router';
import { LayOutComponent } from 'src/app/Components/lay-out/lay-out.component';
import { FormsModule } from '@angular/forms';
import { OrderComponent } from 'src/app/Components/order/order.component';
import { ProductDetailsComponent } from 'src/app/Components/product-details/product-details.component';
import { ProductsComponent } from 'src/app/Components/products/products.component';

const routes: Routes = [
  {
    path: '',
    component: LayOutComponent,
    children: [
      { path: '', redirectTo: '/Home', pathMatch: 'full' },
      {
        path: 'Show',
        component: ShowProductComponent,
      },
    ],
  },
];

@NgModule({
  declarations: [ShowProductComponent],
  imports: [CommonModule, RouterModule.forChild(routes), FormsModule],
})
export class ProductModule {}
