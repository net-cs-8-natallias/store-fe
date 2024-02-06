import { BasketItemModel } from "../models/BasketItemModel";

export default interface BasketService {
    get(): BasketItemModel[];
    add(item: BasketItemModel): void;
    delete(item: BasketItemModel): void;
    clearBusket(): void;
}