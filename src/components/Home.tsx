import { CatalogItemModel } from '../models/CatalogItemModel'
import { ItemBrandModel } from '../models/ItemBrandModel'
import { Link } from 'react-router-dom'
import { ITEM_PATH } from '../config/route-config'
import { useDispatch, useSelector } from 'react-redux'
import { StateType } from '../redux/store'
import { setCatalogItem } from '../redux/actions'


const Home = () => {

  const IMAGE_PATH = 'http://127.0.0.1/assets/images/'
  const items: CatalogItemModel[] = useSelector<StateType, CatalogItemModel[]>(state => state.catalog);
  const brands: ItemBrandModel[] = useSelector<StateType, ItemBrandModel[]>(state => state.brands);
  const dispatch = useDispatch<any>();

  
  return (
    <div className="container">
      <div className="row">
        {
          items.map((e, i) => {
            return  <div key={i} className="col col-12-xs col-4-md pb-5">
            <Link
               to={ITEM_PATH} 
               onClick={() => dispatch(setCatalogItem(e))}
               style={{textDecoration: 'none'}}
            >
              <div className="card h-100 item" style={{width: '18rem', borderRadius: '5px'}}>
                <img src={`${IMAGE_PATH}${e.image}`} className="card-img-top" alt="..."/>
                <div className="card-body">
                  <h3 className="card-title" style={{textAlign: 'center', textTransform: 'uppercase'}}>{brands.find((b) => b.id == e.itemBrandId)?.brand}</h3>
                  <h5 className="card-title" style={{textAlign: 'center', textTransform: 'uppercase'}}>{e.name}</h5>
                  <p className="card-title" style={{textAlign: 'right', textTransform: 'uppercase'}}>{e.price} $</p>
                </div>
            </div>
            </Link>
          </div>
          })
        }
      </div>
    </div>
  )
}

export default Home


