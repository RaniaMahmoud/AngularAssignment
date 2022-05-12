import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutUsComponent } from './Components/about-us/about-us.component';
import { ContactUsComponent } from './Components/contact-us/contact-us.component';
import { ErrorComponent } from './Components/error/error.component';
import { HomeComponent } from './Components/home/home.component';
import { LayOutWithHeaderComponent } from './Components/lay-out-with-header/lay-out-with-header.component';
import { LayOutComponent } from './Components/lay-out/lay-out.component';
import { LoginComponent } from './Components/login/login.component';
import { NewProductComponent } from './Components/new-product/new-product.component';
import { OrderComponent } from './Components/order/order.component';
import { ProductDetailsComponent } from './Components/product-details/product-details.component';
import { ProductsComponent } from './Components/products/products.component';
import { RegisterComponent } from './Components/register/register.component';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserModule } from '@angular/platform-browser';
import { CardComponent } from './Components/card/card.component';
/*i)	Home (static page with any data)
ii)	About us (static page with any data)
iii)	Contact us (static page with any data)
iv)	Products (that opens Shopping cart component).
 */
const routes: Routes = [
  {
    path: '',
    component: LayOutComponent,
    children: [
      { path: '', redirectTo: '/Home', pathMatch: 'full' },
      { path: 'Home', component: HomeComponent },
      { path: 'AboutUs', component: AboutUsComponent },
      { path: 'ContactUs', component: ContactUsComponent },
      { path: 'Products', component: ProductsComponent },
      { path: 'Products/Edit/:id', component: NewProductComponent },
      { path: 'Card', component: CardComponent },
      { path: 'Admin/insertProduct', redirectTo: '/Admin', pathMatch: 'full' },
      { path: 'Admin', component: NewProductComponent },
    ],
  },
  {
    path: '',
    component: LayOutWithHeaderComponent,
    children: [
      { path: 'Login', component: LoginComponent },
      { path: 'Register', component: RegisterComponent },
    ],
  },
  {
    path: 'User',
    loadChildren: () =>
      import('src/app/Components/user/user.module').then((m) => m.UserModule),
  },
  {
    path: 'Product',
    loadChildren: () =>
      import('src/app/Modules/product/product.module').then(
        (p) => p.ProductModule
      ),
  },
  { path: '**', component: ErrorComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes), BrowserModule, MatDialogModule],
  exports: [RouterModule],
})
export class AppRoutingModule {}
