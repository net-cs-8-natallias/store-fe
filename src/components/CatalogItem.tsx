import { useLocation } from "react-router-dom";
import img from '../../public/images/no-image.webp'
import { ItemBrandModel } from "../models/ItemBrandModel";
import { useEffect, useState } from "react";
import axios from "axios";
import { ItemModel } from "../models/ItemModel";
import { BasketItemModel } from "../models/BasketItemModel";

interface Props {
    addToBasket: (itemodel: BasketItemModel) => void
    brands: ItemBrandModel[]
}

const CatalogItem = ({addToBasket, brands}: Props) => {

    const DEFAULT_QUANTITY = 1;

    const CATALOG_BASE_URL = "http://localhost:5288/catalog-bff-controller/items/stock"
    const BASKET_BASE_URL = "http://localhost:5286/basket-bff-controller/item"
    let { state } = useLocation();
    const catalogItem = state.catalogItem;

    const [isLoading, setIsLoading] = useState(false);
    const [items, setItems] = useState<ItemModel[]>([]);
    const [item, setItem] = useState<ItemModel>();

    const loadItem = () => {
        setIsLoading(true);
        // TODO - clear user id (for testing without authorization only)
        axios.get(`${CATALOG_BASE_URL}?catalogItemId=${catalogItem.id}`)
        .then(result => {
            console.log(result.data);
            setItems(result.data);
            setIsLoading(false);
        })
        .catch(err => {
            console.log(err.message)
            setIsLoading(false);
        })
    }

    useEffect(() => {
        loadItem();
    }, [])

    const handleClick = () => {
        setIsLoading(true)
        // TODO - clear user id (for testing without authorization only)
        axios.post(`${BASKET_BASE_URL}?userId=${111}`, {
            itemId: item?.id,
            quantity: DEFAULT_QUANTITY
        })
        .then(result => {
            console.log(result.status)
            setIsLoading(false)
        })
        .catch(err => {
            console.log(err.message)
            setIsLoading(false)
        })

        addToBasket({
            id: item?.id,
            price: catalogItem.price,
            subprice: catalogItem.price,
            quantity: DEFAULT_QUANTITY,
            brandName: brands.find((b: ItemBrandModel) => b.id == catalogItem.itemBrandId)?.brand,
            itemName: catalogItem.name,
            size: item?.size
          })
    }

  return (
    <div className='container'>
      <div className="row">
        <div className="col col-12 d-flex justify-content-center my-5">
        <div className="card h-100" style={{ borderRadius: '5px', width: '90%'}}>

            <img src={img} className="card-img-top" alt="..."/>
     
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
                  onClick={handleClick} 
                  className="btn btn-outline-success">Add To Basket</button>
                </div>
            </div>
        </div>
      </div>
    </div>
  )
}


export default CatalogItem
