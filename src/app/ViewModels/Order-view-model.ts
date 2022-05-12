import { ProductData } from "./ProductData";

export interface OrderVM {
    Id?: number;
    TotalPrice: number;
    AppUserId: string;
    Products: ProductData[]
}