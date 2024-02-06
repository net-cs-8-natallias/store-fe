import axios from "axios";
import { BasketItemModel } from "../models/BasketItemModel";
import BasketService from "./BasketService";

export default class BasketServiceImpl implements BasketService {

    BASKET_BASE_URL = '';

    get(): BasketItemModel[] {
        //axios.get(`${this.BASKET_BASE_URL}/items`)
        throw new Error("Method not implemented.");
    }
    add(item: BasketItemModel): void {
        throw new Error("Method not implemented.");
    }
    delete(item: BasketItemModel): void {
        throw new Error("Method not implemented.");
    }
    clearBusket(): void {
        throw new Error("Method not implemented.");
    }

}