import { Component, OnInit } from '@angular/core';
import { APIUsersService } from 'src/app/Services/apiusers.service';
import { APIProductsService } from 'src/app/Services/apiproducts.service';
import { CardViewModel } from 'src/app/ViewModels/Card-view-model';
import { DataService } from 'src/app/Services/data.service';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { OrderVM } from 'src/app/ViewModels/Order-view-model';
import { ProductData } from 'src/app/ViewModels/ProductData';
@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  TotalPrice: number = 0;
  storeditems = JSON.parse(localStorage.getItem('Card')!);
  Card:CardViewModel[];
  Enable=false;
  Done:boolean;
  order:OrderVM;
  constructor(private APIUsersService:APIUsersService,private APIProductsService: APIProductsService,
    private dataService: DataService,
    private router: Router) {
    this.Card=[];
    this.order={} as OrderVM;
    this.Card=this.storeditems;
    this.Card.map(c=>{
      //console.log(c.Price * c.ProductQuantity!.Quantity)
      this.TotalPrice += c.Price * c.ProductQuantity!.Quantity;
    });
    this.Done=false;
    this.Card.length > 0?this.Enable=true:this.Enable=false;
  }

  ngOnInit(): void {
    console.log(this.storeditems);
    console.log(this.Card);
  }
  
  OnQuantityChange(ID: number,QuantityUser:number) {
    this.Card.map(c=>{
      if(c.ProductID==ID){
        if(QuantityUser <= c.QuantityOfProduct){
          c.ProductQuantity!.Quantity=QuantityUser;
        }
      }
    })
    //localStorage.getItem('Card').
    this.Card.map(c=>{
      this.TotalPrice += c.Price*c.ProductQuantity!.Quantity;
    })
    localStorage.setItem("Card", JSON.stringify(this.Card));
  }

  Delete(id:number){
    this.Card = this.Card.filter(c=> c.ProductID != id);
    console.log(this.Card);
    localStorage.setItem("Card", JSON.stringify(this.Card));
    localStorage.setItem("CardItems", this.Card.length.toString());
    this.Card.map(c=>{
      //console.log(c.Price * c.ProductQuantity!.Quantity)
      this.TotalPrice += c.Price * c.ProductQuantity!.Quantity;
    });
    this.dataService.setProduct();
  }
  PlaceOrder(){
    if(environment.ISLogin){
      this.order.Products=[];
      this.order.AppUserId=environment.UserID;
      this.order.TotalPrice=this.TotalPrice;
      this.Card.forEach(element => {
       this.order.Products.push({ProductID:element.ProductID,Quantity:element.ProductQuantity?.Quantity});
      });
      
      this.APIProductsService.OrderProduct(this.order).subscribe(o=>{
        console.log(o);
        this.Done=true;
        this.Card=[];
        localStorage.setItem("Card", JSON.stringify(this.Card));
        localStorage.setItem("CardItems", this.Card.length.toString());
        this.TotalPrice=0;
        this.Enable=false;
      })
    }else{
      this.router.navigate(['/Login']);
    }
    this.dataService.setProduct();
  }
  closeAlert() {
    this.Done=false;
  }

}
