import React, { useEffect, useState } from 'react'
import { BasketItemModel } from '../models/BasketItemModel'
import axios from 'axios';

interface Props {
  basketItems: BasketItemModel[]
  countItems: (count: number) => void
}

const Basket = ({basketItems, countItems}: Props) => {

  const BASKET_BASE_URL = "http://localhost:5286/basket-bff-controller/items";
  const ORDER_BASE_URL = "http://localhost:5230/order-bff-controller/orders";

  const [isLoading, setIsLoading] = useState(false);
  const [basket, setBasket] = useState([]);

  useEffect(() => {
    loadBasket()
  }, [])

  const loadBasket = () => {
    setIsLoading(true);
    //user id just for testing with no autorization
    axios.get(`${BASKET_BASE_URL}?userId=${111}`)
    .then(result => {
      console.log(result.data)
      setBasket(result.data.map((e: any) => {
        return {
          itemId: e.itemId,
          quantity: e.quantity
        }
      }))
      countItems(result.data.length)
      setIsLoading(false)
    })
    .catch(err => {
      console.log(err.message);
      setIsLoading(false)
    })
    
  }

  return (
    <div>
      <h1>Basket</h1>
      <ul className="list-group list-group-flush">
        {
          basketItems.map((e, i) => <li key={i} className="list-group-item">{e.itemName}</li>)
        }
      </ul>
    </div>
  )
}

export default Basket
