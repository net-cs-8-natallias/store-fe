import { useEffect, useState } from 'react'
import { BasketItemModel } from '../models/BasketItemModel'
import { basketService } from '../config/service-config';
import { useDispatch, useSelector } from 'react-redux';
import { setBasket, setItemsCount } from '../redux/actions';
import { StateType } from '../redux/store';
import { User } from 'oidc-client';

interface Props {
  isModal?: boolean
}

const Basket = ({isModal}: Props) => {

  const IMAGE_PATH = 'http://127.0.0.1/assets/images/'

  const dispatch = useDispatch<any>();
  //const basketItems: BasketItemModel[] = useSelector<StateType, BasketItemModel[]>(state => state.basketItems);
  const [items, setItems] = useState<BasketItemModel[]>([]);
  const [orderId, setOrderId] = useState(0);
  const [isOrderPlaced, setIsOrderPlased] = useState(false);
  const user: User | null = useSelector<StateType, User | null>(state => state.userData)

  useEffect(() => {
    user?.access_token && loadBasket()
  }, [])

  const addToBasket = async(id: number) => {
    console.log('add to basket')
    if(user){
      await basketService.addToBusket(user.access_token, id);
      await loadBasket();
    }
  }

  const removeFromBasket = async(id: number) => {
   if(user){
    await basketService.removeFromBasket(user.access_token, id);
    await loadBasket()
   }
  }

  const checkoutBasket = async() => {
    if(user){
      const orderId = await basketService.checkoutBasket(user.access_token);
      console.log(orderId)
      setOrderId(orderId)
      setIsOrderPlased(true);
    }
  }

  const loadBasket = async() => {
    console.log('load basket')
    if(user){
      const basketItems = await basketService.getBasket(user.access_token);
      setItems(basketItems)
      await dispatch(setBasket(basketItems));
      const count = basketItems.reduce((res: number, cur: BasketItemModel) => res += cur.quantity, 0);
      await dispatch(setItemsCount(count));
    }
  }

  return (
    <div>
      <div className='container-fluid '>
        <div className='d-flex justify-content-center'>
         {
          items.length === 0 
          ? (<h1 style={{color: 'green'}}>Basket empty</h1>)
          : (<>
            {
              isOrderPlaced 
              ? (<h1 style={{color: 'green'}}>Your order confirmation number: {orderId}</h1>) 
              : (<h1 style={{color: 'green'}}>Check Out</h1>)
            }
            </>)
         }
        </div>     
        {
          items.map((e, i) => <div key={i} className='row ' >
            <div className={`${!!!isModal && "col-lg-5 "}col col-12`}>
            <div className='h-100' style={{ width: isOrderPlaced ? '10rem' : '18rem', borderRadius: '5px' }}>
                <img className="card-img" src={`${IMAGE_PATH}${e.image}`} rel='...'/>
              </div>
            </div>
            <div className={`${!!!isModal && "col-lg-4 "}col col-12`} >
              <h6 style={{fontWeight: 'bold'}}>{e.name}</h6>
              <p><span style={{fontWeight: 'bold'}}>Size: </span>{e.size}</p>
              <p><span style={{fontWeight: 'bold'}}>Price: </span>{e.price} <span style={{fontWeight: 'bold'}}>$</span></p>
              <p><span style={{fontWeight: 'bold'}}>Quantity: </span>{e.quantity}</p>
              <p><span style={{fontWeight: 'bold'}}>Subprice: </span>{(e.price * e.quantity).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} <span style={{fontWeight: 'bold'}}>$</span></p>
            </div>
            {
              !isOrderPlaced 
              && <div className={`${!!!isModal && "col-lg-3 "}col col-12`}>
                <button onClick={() => removeFromBasket(e.itemId)} disabled={e.quantity < 0} type="button" className={`btn ${e.quantity <= 0 ? "btn-secondary": "btn-danger"}`} style={{fontWeight: 'bold', width: '40px'}}>-</button>
                <span className='p-3' style={{fontWeight: 'bold', fontSize: '20px'}}>{e.quantity}</span>
                <button onClick={() => addToBasket(e.itemId)} disabled={e.stockQuantity - e.quantity <1} type="button" className={`btn ${e.stockQuantity - e.quantity < 1 ? "btn-secondary" : "btn-success"}`} style={{fontWeight: 'bold', width: '40px'}}>+</button>
            </div>
            }
          </div>)
        }
        {
          items.length > 0 
          && <div className="container">
          <div className="row p-5" style={{background: 'rgb(242, 242, 242)'}}>
            <div className={`${!!!isModal && "col-lg-8 "}col col-12`}>
              <h3>Total: <span>{items.reduce((res, cur) => res + (cur.price * cur.quantity), 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} </span>$</h3>
            </div>
            {
              !isOrderPlaced 
              &&
              <div className={`${!!!isModal && "col-lg-4 "}col col-12`}>
                <button onClick={checkoutBasket} className='btn btn-success' style={{width: '100%'}} >Place Order</button>
              </div>
            }
          </div>
          </div>
        }
      </div>
    </div>
  )
}

export default Basket
