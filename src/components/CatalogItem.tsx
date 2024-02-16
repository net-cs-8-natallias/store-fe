import { ItemBrandModel } from "../models/ItemBrandModel";
import { useEffect, useState } from "react";
import { ItemModel } from "../models/ItemModel";
import { useDispatch, useSelector } from "react-redux";
import { StateType } from "../redux/store";
import { authService, basketService, catalogService } from "../config/service-config";
import { CatalogItemModel } from "../models/CatalogItemModel";
import { setBasket, setItemsCount } from "../redux/actions";
import BasketModal from "./BasketModal";
import { User } from "oidc-client";

const CatalogItem = () => {

    const IMAGE_PATH = 'http://127.0.0.1/assets/images/'

    const dispatch = useDispatch<any>();
    const brands: ItemBrandModel[] = useSelector<StateType, ItemBrandModel[]>(state => state.brands);
    const catalogItem: CatalogItemModel = useSelector<StateType, CatalogItemModel>(state => state.catalogItem);
    const count: number = useSelector<StateType, number>(state => state.count);
    //const user: User | null | undefined = useSelector<StateType, User | null | undefined>(state => state.user);

    const [items, setItems] = useState<ItemModel[]>([]);
    const [item, setItem] = useState<ItemModel>();
    const [user, setUser] = useState<User | null | undefined>(null);

    const loadItem = async() => {
      const data = await catalogService.getItems(catalogItem.id)
      setItems(data)
      // TODO error handler
    }

    useEffect(() => {
        loadItem();
    }, [])

    const handleAdding = async() => {
      if(user && item && item.quantity > 0){
        basketService.addToBusket(item.id)
        dispatch(setItemsCount(count + 1));
        const basketItems = await basketService.getBasket();
        dispatch(setBasket(basketItems))
      } else if(user === null || user === undefined){
        const currentUser = await authService.login();
        setUser(currentUser)
        //dispatch(setUser(currentUser));
      }
      else {
        console.log('error')
      }
    }



  return (
    <div className='container'>
      <div className="row">
        <div className="col col-12 d-flex justify-content-center">
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
        </div>
        {/* <BasketModal/> */}
      </div>
    </div>
  )
}


export default CatalogItem


