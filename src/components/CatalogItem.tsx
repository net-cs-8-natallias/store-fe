import { ItemBrandModel } from "../models/ItemBrandModel";
import { useEffect, useState } from "react";
import { ItemModel } from "../models/ItemModel";
import { useDispatch, useSelector } from "react-redux";
import { StateType } from "../redux/store";
import { basketService, catalogService } from "../config/service-config";
import { CatalogItemModel } from "../models/CatalogItemModel";
import { setBasket, setItemsCount } from "../redux/actions";
import { LOGIN_PATH } from "../config/route-config";
import { useNavigate } from "react-router-dom";
import { User } from "oidc-client";
import BasketModal from "./BasketModal";
import { useParams } from 'react-router-dom';

const CatalogItem = () => {

    const IMAGE_PATH = 'http://127.0.0.1/assets/images/'

    const dispatch = useDispatch<any>();
    const brands: ItemBrandModel[] = useSelector<StateType, ItemBrandModel[]>(state => state.brands);
    const count: number = useSelector<StateType, number>(state => state.count);
    const user: User | null = useSelector<StateType, User | null>(state => state.userData);

    const [item, setItem] = useState<ItemModel>();
    const [items, setItems] = useState<ItemModel[]>([]);
    const [catalogItem, setCatalogItem] = useState<CatalogItemModel>()
  
    const navigate = useNavigate();
    const { itemId } = useParams();

    const loadItem = async() => {
      if(itemId) {
        const currentCatalogItem = await catalogService.getCatalogItem(+itemId);
        if(currentCatalogItem){
          setCatalogItem(currentCatalogItem)
          const currentItems = await catalogService.getItems(currentCatalogItem.id)
          currentItems && setItems(currentItems)
        }
      }
    }

    useEffect(() => {
      loadItem();
    }, [itemId]);

    const handleAdding = async() => {
      if(user && item && item.quantity > 0){
        await basketService.addToBusket(user.access_token, item.id)
        dispatch(setItemsCount(count + 1));
        const basketItems = await basketService.getBasket(user.access_token);
        dispatch(setBasket(basketItems))
      }
      else if(!user){
        navigate(LOGIN_PATH);
      }
      else {
        console.log('error')
      }
    }

  return (
    <div className='container'>
      <div className="row">
        <div className="col col-12 d-flex justify-content-center">
        {
          catalogItem !== undefined 
          &&
          <div className="card h-100" style={{ borderRadius: '5px', width: '90%'}}>
            <img src={`${IMAGE_PATH}${catalogItem.image}`} className="card-img-top" alt="..."/>
                <div className="card-body d-block">
                  <h3 className="card-title" style={{textAlign: 'center', textTransform: 'uppercase'}}>{brands.find((b: ItemBrandModel) => b.id == catalogItem.itemBrandId)?.brand}</h3>
                  <h5 className="card-title" style={{textAlign: 'center', textTransform: 'uppercase'}}>{catalogItem.name}</h5>
                  <p className="card-title" style={{textAlign: 'right', textTransform: 'uppercase'}}>{catalogItem.price} $</p>
                  <select 
                    className="form-select" 
                    aria-label="Default select example"
                    defaultValue="0"
                    onChange={(e) => setItem(items.find(item => item.id + '' === e.target.value))}
                    >
                        <option value="0" disabled>Select size</option>
                        {
                            items.map((e, i) => {
                                return <option 
                                value={e.id + ''} 
                                key={e.id+ ''}
                                disabled={e.quantity === 0}
                                >
                                    {e.size}
                                </option>
                            })
                        }
                  </select>
                  <div className="m-3">
                    <p className="card-title" style={{textAlign: 'left', textTransform: 'uppercase'}}>{catalogItem.description}</p>
                  </div>
                  <button 
                  onClick={handleAdding} 
                  data-bs-target="#exampleModal"
                  data-bs-toggle="modal"
                  className="btn btn-outline-success">Add To Basket</button>
                </div>
            </div>
        }
        </div>
        <BasketModal/>
      </div>
    </div>
  )
}


export default CatalogItem


