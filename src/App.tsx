import { useEffect, useState } from 'react'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ROUTES } from './config/route-config';
import Navigator from './navigator/Navigator';
import SideBar from './navigator/SideBar';
import Main from './components/Main';
import { useDispatch, useSelector } from 'react-redux';
import { basketService, catalogService } from './config/service-config';
import { setBasket, setBrands, setCatalog, setCategories, setItemsCount, setTypes } from './redux/actions';
import { BasketItemModel } from './models/BasketItemModel';
import { ItemBrandModel } from './models/ItemBrandModel';
import { StateType } from './redux/store';
import { CatalogItemModel } from './models/CatalogItemModel';
import { RouteType } from './models/RouteType';



function App() {

  const dispatch = useDispatch<any>();
  const brands: ItemBrandModel[] = useSelector<StateType, ItemBrandModel[]>(state => state.brands);
  const catalogItems: CatalogItemModel[] = useSelector<StateType, CatalogItemModel[]>(state => state.catalog);

  const [category, setCategory] = useState(0);
  const [brand, setBrand] = useState(0);
  const [type, setType] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [sorting, setSorting] = useState(0);


  const loadData = async() => {
    setIsLoading(true);
    let data = await catalogService.getCatalog({
      category: category,
      type: type,
      brand: brand
    });
    dispatch(setCatalog(data));
    setIsLoading(false)
    // TODO error handler
  }

  const getCategories = async() => {
    setIsLoading(true);
    const data = await catalogService.getCategories()
    dispatch(setCategories(data));
    setIsLoading(false)
    // TODO error handler
  }

  const getTypes = async() => {
    setIsLoading(true);
    const data = await catalogService.getTypes()
    dispatch(setTypes(data));
    setIsLoading(false)
    // TODO error handler
  }

  const getBrands = async() => {
    setIsLoading(true);
    const data = await catalogService.getBrands()
    dispatch(setBrands(data));
    setIsLoading(false)
    // TODO error handler
  }

  const setNewType = (id: number) => {
    setType(id);
  }

  const setNewCategory = (id: number) => {
    setCategory(id);
  }

  const setNewBrand = (id: number) => {
    setBrand(id);
  }

  useEffect(() => {
    console.log("loading filtered data data......")
    loadData()
    setSorting(0)
  }, [type, category, brand])

  useEffect(() => {
    console.log("loading all data......")
    loadData();
    getCategories();
    getBrands();
    getTypes();
    loadBasket()
  }, [])

  const loadBasket = async() => {
    setIsLoading(true)
    const basketItems = await basketService.getBasket();
    const count = basketItems.reduce((res: number, cur: BasketItemModel) => res += cur.quantity, 0);
    dispatch(setItemsCount(count))
    dispatch(setBasket(basketItems))
    setIsLoading(false)
  }

  const sortItems = async() => {
    if(sorting !== 0){
        const sortedItems = [...catalogItems].sort((a, b) => sorting === 1 
            ? a.price - b.price : b.price - a.price);
        await dispatch(setCatalog(sortedItems));
    }
  };

  useEffect(() => {
      sortItems();
  }, [sorting]);

  const setNewUser = () => {
    // TODO auth
  }

  return (
    <BrowserRouter>
    <div className="container-fluid" style={{ padding: '0', margin: '0', overflowX: 'hidden' }}> 
      <Navigator 
        setCategory={setNewCategory} 
        setNewBrand={setNewBrand} 
      />
      <div className="row ">
        <div className="col-lg-3 col-4 ">
        <SideBar 
          setType={setNewType}
        />
        </div>
        <Main>


        <div className="row">
        <div className="col-lg-4 col-6 my-5">
          <select 
            className="form-select" 
            aria-label="Default select example"
            value={sorting}
            onChange={(e) => setSorting(+e.target.value)}
            >
            <option value="0">Sort</option>
            <option value="1">Price from low to high</option>
            <option value="2">Price from high to low</option>
          </select>
        </div>
        <div className="col-lg-4 col-6 my-5">
          {brand !== 0 
          && <>
          <div className='d-flex justify-content-center'>
            <h2>{brands.find(e => e.id == brand)?.brand} </h2>
            <button onClick={() => setBrand(0)} type="button" className="btn-close" aria-label="Close"></button>
          </div>
          </>}
        </div>
      </div>


        {
          isLoading 
          ? (
            <div className='conteiner d-flex justify-content-center m-5'>
              <div className="spinner-border text-success" role="status">
              </div>
            </div>
          ) 
          : ( 
            <Routes>
              { getRoutes(ROUTES) }
            </Routes> 
          )
        }
        </Main>
      </div>
    </div>
      </BrowserRouter>
  )
}

export default App

const getRoutes = (routes: RouteType[]) => {
  return routes.map((e) => <Route key={e.path} path={e.path} element={e.element}/>)
}


