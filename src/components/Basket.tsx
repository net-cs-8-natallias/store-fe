import { useEffect, useState } from 'react'
import { BasketItemModel } from '../models/BasketItemModel'
import { basketService } from '../config/service-config';
import { useDispatch, useSelector } from 'react-redux';
import { StateType } from '../redux/store';
import { setBasket, setItemsCount } from '../redux/actions';

const Basket = () => {

  const IMAGE_PATH = 'http://127.0.0.1/assets/images/'

  const dispatch = useDispatch<any>();
  const basketItems: BasketItemModel[] = useSelector<StateType, BasketItemModel[]>(state => state.basketItems);
 
  useEffect(() => {
    loadBasket()
  }, [])

  const addToBasket = async(id: number) => {
    await basketService.addToBusket(id);
    await loadBasket();
    // TODO error handler
  }

  const removeFromBasket = async(id: number) => {
    await basketService.removeFromBasket(id);
    await loadBasket()
    // TODO error handler
  }

  const checkoutBasket = async() => {
    const orderId = await basketService.checkoutBasket();
    // TODO error handler
    // TODO display order id
  }


  const loadBasket = async() => {
    const basketItems = await basketService.getBasket();
    dispatch(setBasket(basketItems));
    const count = basketItems.reduce((res: number, cur: BasketItemModel) => res += cur.quantity, 0);
    dispatch(setItemsCount(count));
    console.log(basketItems)
    // TODO error handler
  }

  return (
    <div>
      <div className='container-fluid mb-5'>
        <div className='d-flex justify-content-center m-4'>
         <h1 style={{color: 'green'}}>Check Out</h1>
        </div>     
        {
          basketItems.map((e, i) => <div key={i} className='row my-3' >
            <div className="col col-lg-5 col-12">
              <div className='h-100' style={{width: '18rem', borderRadius: '5px'}}>
                <img className="card-img" src={`${IMAGE_PATH}${e.image}`} rel='...'/>
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
              <button onClick={() => addToBasket(e.itemId)} disabled={e.stockQuantity - e.quantity <1} type="button" className="btn btn-secondary" style={{fontWeight: 'bold', width: '40px'}}>+</button>
            </div>
          </div>)
        }
        <div className="container">
        <div className="row p-5" style={{background: 'rgb(242, 242, 242)'}}>
          <div className="col col-lg-8 col-12 ">
            <h3>Total: <span>{basketItems.reduce((res, cur) => res + (cur.price * cur.quantity), 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} </span>$</h3>
          </div>
          <div className="col col-lg-4 col-12 ">
            <button onClick={checkoutBasket} className='btn btn-success' style={{width: '100%'}} disabled={basketItems.length < 1}>Place Order</button>
          </div>
        </div>
        </div>

      </div>
    </div>
  )
}

export default Basket
