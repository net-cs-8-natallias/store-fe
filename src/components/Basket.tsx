import { useEffect, useState } from 'react'
import { BasketItemModel } from '../models/BasketItemModel'
import axios from 'axios';
import img from '../../public/images/no-image.webp'

interface Props {
  addToBasket: (id: number) => void,
  removeFromBasket: (id: number) => void
  checkoutBasket: () => void
  itemsCount: (count: number) => void
}

const Basket = ({addToBasket, removeFromBasket, checkoutBasket, itemsCount}: Props) => {

  const BASKET_BASE_URL = "http://localhost:5286/basket-bff-controller/items";

  const [items, setItems] = useState<BasketItemModel[]>([]);

  useEffect(() => {
    loadBasket()
  }, [])


  const loadBasket = () => {
    //user id just for testing with no autorization
    axios.get(`${BASKET_BASE_URL}?userId=${111}`)
    .then(result => {
      setItems(result.data)
      itemsCount(result.data.reduce((res: number, cur: BasketItemModel) => res += cur.quantity, 0))
    })
    .catch(err => {
      console.log(err.message);
    })
    
  }

  return (
    <div>
      <div className='container-fluid mb-5'>
        <div className='d-flex justify-content-center m-4'>
         <h1 style={{color: 'green'}}>Check Out</h1>
        </div>     
        {
          items.map((e, i) => <div key={i} className='row my-3' >
            <div className="col col-lg-5 col-12">
              <div className='h-100' style={{width: '18rem', borderRadius: '5px'}}>
                <img className="card-img" src={img} rel='...'/>
              </div>
            </div>
            <div className="col col-lg-4 col-12">
              <h3 style={{fontWeight: 'bold'}}>{e.name}</h3>
              <p><span style={{fontWeight: 'bold'}}>Size: </span>{e.size}</p>
              <p><span style={{fontWeight: 'bold'}}>Price: </span>{e.price} <span style={{fontWeight: 'bold'}}>$</span></p>
              <p><span style={{fontWeight: 'bold'}}>Quantity: </span>{e.quantity}</p>
              <p><span style={{fontWeight: 'bold'}}>Subprice: </span>{(e.price * e.quantity).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} <span style={{fontWeight: 'bold'}}>$</span></p>
            </div>
            <div className="col col-lg-3 col-12">
              <button onClick={() => removeFromBasket(e.itemId)} disabled={e.quantity <= 0} type="button" className="btn btn-secondary" style={{fontWeight: 'bold', width: '40px'}}>-</button>
              <span className='p-3' style={{fontWeight: 'bold', fontSize: '20px'}}>{e.quantity}</span>
              <button onClick={() => addToBasket(e.itemId)} disabled={e.stockQuantity <1} type="button" className="btn btn-secondary" style={{fontWeight: 'bold', width: '40px'}}>+</button>
            </div>
          </div>)
        }
        <div className="container">
        <div className="row p-5" style={{background: 'rgb(242, 242, 242)'}}>
          <div className="col col-lg-8 col-12 ">
            <h3>Total: <span>{items.reduce((res, cur) => res + (cur.price * cur.quantity), 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} </span>$</h3>
          </div>
          <div className="col col-lg-4 col-12 ">
            <button onClick={checkoutBasket} className='btn btn-success' style={{width: '100%'}} disabled={items.length < 1}>Place Order</button>
          </div>
        </div>
        </div>

      </div>
    </div>
  )
}

export default Basket
