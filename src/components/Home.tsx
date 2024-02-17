import { CatalogItemModel } from '../models/CatalogItemModel'
import { ItemBrandModel } from '../models/ItemBrandModel'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { StateType } from '../redux/store'
import { setCatalog, setCatalogItem } from '../redux/actions'
import { useEffect, useState } from 'react'

const Home = () => {

  const IMAGE_PATH = 'http://127.0.0.1/assets/images/'
  const items: CatalogItemModel[] = useSelector<StateType, CatalogItemModel[]>(state => state.catalog);
  const brands: ItemBrandModel[] = useSelector<StateType, ItemBrandModel[]>(state => state.brands);
  const dispatch = useDispatch<any>();

  const [sorting, setSorting] = useState(0);

  const sortItems = async() => {
    if(sorting !== 0){
        const sortedItems = [...items].sort((a, b) => sorting === 1 
            ? a.price - b.price : b.price - a.price);
        await dispatch(setCatalog(sortedItems));
    }
  };

  useEffect(() => {
    sortItems();
  }, [sorting]);
  
  return (

    <div className="container">
            <div className="row">

              <div className="col-lg-4 col-6 my-3">
                <select 
                className="form-select" 
                aria-label="Default select example"
                value={sorting}
                onChange={(e) => setSorting(+e.target.value)}
                >
                  <option value="0" disabled>Sort</option>
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
               to={`item/${e.id}`} 
               style={{textDecoration: 'none'}}
               onClick={() => dispatch(setCatalogItem(e))}
            >
              <div className="card h-100 item" style={{width: '18rem', borderRadius: '5px'}}>
                <img src={`${IMAGE_PATH}${e.image}`} className="card-img-top" alt="..."/>
                <div className="card-body">
                  <h3 className="card-title" style={{textAlign: 'left', textTransform: 'uppercase'}}>{brands.find((b) => b.id == e.itemBrandId)?.brand}</h3>
                  <h5 className="card-title" style={{textAlign: 'left', textTransform: 'uppercase'}}>{e.name}</h5>
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


