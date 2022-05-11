export interface CardViewModel {
  ID?:number,
  TotalPrice?:number,
  UserID:string,
  ProductQuantity?:{
    ID?:number,
    ProductID:number,
    OrderID?:number,
    Quantity:number
  }
}
