import axios from "axios";
import BasketService from "./BasketService";
import { BasketItemModel } from "../models/BasketItemModel";

const DEFAULT_QUANTITY = 1;
// TODO - clear user id (for testing without authorization only)
const USER_ID_URI = "?userId=111"

export default class BasketServiceRest implements BasketService {

    private _baseUrl: string;

    constructor(baseUrl: string){
        this._baseUrl = baseUrl
    }
    
    async getBasket(): Promise<BasketItemModel[]> {
        return await axios.get(`${this._baseUrl}/items${USER_ID_URI}`)
        .then(result => {
          return result.data
        })
        .catch(err => {
          console.log(err.message);
        })
    }

    async addToBusket(id: number): Promise<void> {
        await axios.post(`${this._baseUrl}/item${USER_ID_URI}`, {
            itemId: id,
            quantity: DEFAULT_QUANTITY
        })
        .then(result => {
            console.log(result.status)
        })
        .catch(err => {
            console.log(err.message)
        })
    }

    async removeFromBasket(id: number): Promise<void> {
        await axios.delete(`${this._baseUrl}/item/${id}/${DEFAULT_QUANTITY}${USER_ID_URI}`)
        .then()
        .catch(err => {
            console.log(err.message)
        })
    }
    async checkoutBasket(): Promise<number> {
        return await axios.post(`${this._baseUrl}/items/checkout${USER_ID_URI}`)
        .then(result => {
            return result.data;
        })
        .catch(err => {
          console.log(err.message)
        })
    }
    
}