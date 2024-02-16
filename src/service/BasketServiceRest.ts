import axios from "axios";
import BasketService from "./BasketService";
import { BasketItemModel } from "../models/BasketItemModel";
import { UserData } from "../models/UserData";

const DEFAULT_QUANTITY = 1;
// TODO - clear user id (for testing without authorization only)
// const USER_ID_URI = "?userId=111"

export default class BasketServiceRest implements BasketService {

    private _baseUrl: string;

    constructor(baseUrl: string){
        this._baseUrl = baseUrl
    }

    //headers: {
    // Authorization: `Bearer ${currentUser.access_token}`,
    //},
    
    async getBasket(user: UserData): Promise<BasketItemModel[]> {
        return await axios.get(`${this._baseUrl}/items`, {
            headers: {
              Authorization: `Bearer ${user.token}`,
            //   'Content-Type': 'application/json', 
            },
          })
        .then(result => {
          return result.data
        })
        .catch(err => {
          console.log(err.message);
        })
    }

    async addToBusket(user: UserData, id: number): Promise<void> {
        await axios.post(`${this._baseUrl}/item`, {
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

    async removeFromBasket(user: UserData, id: number): Promise<void> {
        await axios.delete(`${this._baseUrl}/item/${id}/${DEFAULT_QUANTITY}`)
        .then()
        .catch(err => {
            console.log(err.message)
        })
    }
    async checkoutBasket(user: UserData): Promise<number> {
        return await axios.post(`${this._baseUrl}/items/checkout`)
        .then(result => {
            return result.data;
        })
        .catch(err => {
          console.log(err.message)
        })
    }
    
}