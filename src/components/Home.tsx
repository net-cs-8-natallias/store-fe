import { CatalogItemModel } from '../models/CatalogItemModel'
import { ItemBrandModel } from '../models/ItemBrandModel'
import { Link } from 'react-router-dom'
import { ITEM_PATH } from '../config/route-config'
import { useDispatch, useSelector } from 'react-redux'
import { StateType } from '../redux/store'
import { catalogService } from '../config/service-config'
import { ItemModel } from '../models/ItemModel'
import { setItem } from '../redux/actions'
interface Props {
  sortItems: (filter: number) => void
}

const Home = ({sortItems}: Props) => {

  const IMAGE_PATH = 'http://127.0.0.1/assets/images/'
  const items: CatalogItemModel[] = useSelector<StateType, CatalogItemModel[]>(state => state.catalog);
  const brands: ItemBrandModel[] = useSelector<StateType, ItemBrandModel[]>(state => state.brands);

  const setCurrentItem = async(id: number) => {
    const data = await catalogService.getItem(id)
    if(data !== null){
      dispatch(setItem(data));
    }
  }
  
  return (
    <div className="container my-5">
      <div className="row">
        <div className="col-lg-4 col-6 mb-5">
          <select 
            className="form-select" 
            aria-label="Default select example"
            value="0"
            onChange={(e) => sortItems(+e.target.value)}
            >
            <option value="0">Sort</option>
            <option value="1">Price from low to high</option>
            <option value="2">Price from high to low</option>
          </select>
        </div>
      </div>
      <div className="row">
        {
          items.map((e, i) => {
            return  <div key={i} className="col col-12-xs col-4-md pb-5">
            <Link
               to={ITEM_PATH} 
               onClick={() => setCurrentItem(e.id)}
              //  state={{ catalogItem: e }}
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
function dispatch(arg0: Promise<void>) {
  throw new Error('Function not implemented.')
}

