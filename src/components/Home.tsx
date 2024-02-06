import { CatalogItemModel } from '../models/CatalogItemModel'
import img from '../../public/images/no-image.webp'
import { ItemBrandModel } from '../models/ItemBrandModel'
import { Link } from 'react-router-dom'
import { ITEM_PATH } from '../config/route-config'
interface Props {
  items: CatalogItemModel[]
  brands: ItemBrandModel[]
  sortItems: (filter: number) => void
}

const Home = ({items, brands, sortItems}: Props) => {

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
               to={ITEM_PATH} state={{ catalogItem: e }}
               style={{textDecoration: 'none'}}
            >
              <div className="card h-100 item" style={{width: '18rem', borderRadius: '5px'}}>
                <img src={img} className="card-img-top" alt="..."/>
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
