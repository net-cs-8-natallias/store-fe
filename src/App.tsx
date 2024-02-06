import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { BASKET_PATH, HOME_PATH, ITEM_PATH, LOGIN_PATH, LOGOUT_PATH } from './config/route-config';
import Navigator from './navigator/Navigator';
import SideBar from './navigator/SideBar';
import Basket from './components/Basket';
import Home from './components/Home';
import Login from './components/Login';
import Logout from './components/Logout';
import Main from './components/Main';
import CatalogItem from './components/CatalogItem';
import { useDispatch } from 'react-redux';
import { catalogService } from './config/service-config';
import { setBrands, setCatalog, setCategories, setTypes } from './redux/actions';



function App() {

  const BASKET_BASE_URL = "http://localhost:5286/basket-bff-controller";
  const DEFAULT_QUANTITY = 1;

  const [category, setCategory] = useState(0);
  const [brand, setBrand] = useState(0);
  const [type, setType] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const [count, setCount] = useState(0);

  const dispatch = useDispatch<any>();
 
  const loadData = async() => {
    setIsLoading(true);
    const data = await catalogService.getCatalog({
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
  }, [type, category, brand])

  useEffect(() => {
    console.log("loading all data......")
    loadData();
    getCategories();
    getBrands();
    getTypes();
  }, [])

  const sortItems = (filter: number) => {
    // const items: CatalogItemModel[] = useSelector<StateType, CatalogItemModel[]>(state => state.catalog);
    // dispatch(setCatalog(prevItems => prevItems.sort((a, b) => a.price - b.price)))

    // if (filter === 1) {
    //   setData((prevData) => [...prevData].sort((a, b) => a.price - b.price));

    // } else if (filter === 2) {
    //   setData((prevData) => [...prevData].sort((a, b) => b.price - a.price));
    // }
  };

  const addToBasket = (id: number) => {
    setIsLoading(true)
    // TODO - clear user id (for testing without authorization only)
    axios.post(`${BASKET_BASE_URL}/item?userId=${111}`, {
        itemId: id,
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
    let newCount = count + 1;
    setCount(newCount);
  }

  const removeFromBasket = (id: number) => {
    setIsLoading(true)
    // TODO - clear user id (for testing without authorization only)
    axios.delete(`${BASKET_BASE_URL}/item/${id}/${DEFAULT_QUANTITY}?userId=${111}`)
    .then(result => {
        setIsLoading(false)
    })
    .catch(err => {
        console.log(err.message)
        setIsLoading(false)
    })
    let newCount = count - 1;
    setCount(newCount);
  }

  const checkoutBasket = () => {
    setIsLoading(true)
    // TODO - clear user id (for testing without authorization only)
    axios.post(`${BASKET_BASE_URL}/items/checkout?userId=${111}`)
    .then(result => {
      setIsLoading(false)
      setOrderId(result.data)
      console.log('order id: ' + result.data)
    })
    .catch(err => {
      console.log(err.message)
      setIsLoading(false)
    })
  }

  const itemsCount = (newCount: number) => {
    setCount(newCount);
  }


  const setNewUser = () => {
    // TODO auth
  }

  return (
    <BrowserRouter>
    <div className="container-fluid" style={{ padding: '0', margin: '0', overflowX: 'hidden' }}> 
      <Navigator 
        setCategory={setNewCategory} 
        setNewBrand={setNewBrand} 
        count={count}
      />
      <div className="row ">
        <div className="col-lg-3 col-4 ">
        <SideBar 
          setType={setNewType}
        />
        </div>
        <Main>
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
              <Route 
                key={HOME_PATH} 
                path={HOME_PATH} 
                element={<Home 
                sortItems={sortItems}/>}
              />
              <Route 
                key={BASKET_PATH} 
                path={BASKET_PATH} 
                element={<Basket 
                  addToBasket={addToBasket} 
                  removeFromBasket={removeFromBasket} 
                  checkoutBasket={checkoutBasket}
                  itemsCount={itemsCount}
                />}
              />
              <Route 
                key={LOGIN_PATH} 
                path={LOGIN_PATH} 
                element={<Login 
                  setUser={setNewUser}
                />}
              />
              <Route 
                key={LOGOUT_PATH} 
                path={LOGOUT_PATH} 
                element={<Logout/>}
              />
              <Route 
                key={ITEM_PATH} 
                path={ITEM_PATH} 
                element={<CatalogItem 
                  addToBasket={addToBasket}
                />}
              />
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
