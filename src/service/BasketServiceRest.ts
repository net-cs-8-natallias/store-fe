import axios from "axios";
import BasketService from "./BasketService";
import { BasketItemModel } from "../models/BasketItemModel";

const DEFAULT_QUANTITY = 1;

export default class BasketServiceRest implements BasketService {

    private _baseUrl: string;

    constructor(baseUrl: string){
        this._baseUrl = baseUrl
    }

    async getBasket(user: string): Promise<BasketItemModel[]> {
        return await axios.get(`${this._baseUrl}/items`, {
            headers: {
              Authorization: `Bearer ${user}`,
            },
          })
        .then(result => {
          return result.data
        })
        .catch(err => {
          console.log(err.message);
          return []
        })
    }

    async addToBusket(user: string, id: number): Promise<void> {
        await axios.post(`${this._baseUrl}/item`, {
            itemId: id,
            quantity: DEFAULT_QUANTITY
        }, {
          headers: {
            Authorization: `Bearer ${user}`, 
        },
        })
        .then()
        .catch(err => {
            console.log(err.message)
        })
    }

    async removeFromBasket(user: string, id: number): Promise<void> {
        await axios.delete(`${this._baseUrl}/item/${id}/${DEFAULT_QUANTITY}`, {
            headers: {
              Authorization: `Bearer ${user}`, 
            },
          })
        .then()
        .catch(err => {
            console.log(err.message)
        })
    }
    async checkoutBasket(user: string): Promise<number> {
        return await axios.post(`${this._baseUrl}/items/checkout`, {}, {
            headers: {
              Authorization: `Bearer ${user}`, 
            },
          })
        .then(result => {
            return result.data;
        })
        .catch(err => {
          console.log(err.message)
        })
    }
    
}