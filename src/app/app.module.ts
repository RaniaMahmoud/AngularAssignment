import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './Components/header/header.component';
import { ProductsComponent } from './Components/products/products.component';
import { FooterComponent } from './Components/footer/footer.component';
import { SideMenuComponent } from './Components/side-menu/side-menu.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductCardDirective } from './Directive/product-card.directive';
import { EgynationaIDPipe } from './/Pipes/egynationa-id.pipe';
import { CreditCardPipe } from './Pipes/credit-card.pipe';
import { OrderComponent } from './Components/order/order.component';
import { HomeComponent } from './Components/home/home.component';
import { ErrorComponent } from './Components/error/error.component';
import { AboutUsComponent } from './Components/about-us/about-us.component';
import { ContactUsComponent } from './Components/contact-us/contact-us.component';
import { ProductDetailsComponent } from './Components/product-details/product-details.component';
import { RegisterComponent } from './Components/register/register.component';
import { LayOutComponent } from './Components/lay-out/lay-out.component';
import { LoginComponent } from './Components/login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { NewProductComponent } from './Components/new-product/new-product.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { LayOutWithHeaderComponent } from './Components/lay-out-with-header/lay-out-with-header.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ProductDialogComponent } from './Components/product-dialog/product-dialog.component';
import {MatTableModule} from '@angular/material/table'
im
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    SideMenuComponent,
    ProductCardDirective,
    EgynationaIDPipe,
    CreditCardPipe,
    OrderComponent,
    HomeComponent,
    ErrorComponent,
    AboutUsComponent,
    ContactUsComponent,
    ProductDetailsComponent,
    RegisterComponent,
    LayOutComponent,
    LoginComponent,
    NewProductComponent,
    LayOutWithHeaderComponent,
    ProductDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,
    NoopAnimationsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatTableModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
