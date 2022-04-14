export class ProductViewModel {
    ID: number;
    Name: String;
    Quantity: number;
    UserQ:number;
    Price: number;
    constructor(ID:number,Name:String,Quantity:number,Price:number,UserQ:number){
        this.ID=ID;
        this.Name=Name;
        this.Price=Price;
        this.Quantity=Quantity;
        this.UserQ=UserQ;
    }
}
