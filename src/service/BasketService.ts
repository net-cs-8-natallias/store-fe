import { User } from "oidc-client";
import { BasketItemModel } from "../models/BasketItemModel";
import { UserData } from "../models/UserData";


export default interface BasketService {

    // getBasket(user: UserData): Promise<BasketItemModel[]>
    // addToBusket(user: UserData, id: number): Promise<void>;
    // removeFromBasket(user: UserData, id: number): Promise<void>;
    // checkoutBasket(user: UserData): Promise<number>;

    getBasket(user: string): Promise<BasketItemModel[]>
    addToBusket(user: string, id: number): Promise<void>;
    removeFromBasket(user: string, id: number): Promise<void>;
    checkoutBasket(user: string): Promise<number>;
}