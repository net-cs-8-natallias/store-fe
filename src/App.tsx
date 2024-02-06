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
import { ItemBrandModel } from './models/ItemBrandModel';
import { CatalogItemModel } from './models/CatalogItemModel';
import { ItemCategoryModel } from './models/ItemCategoryModel';
import { ItemTypeModel } from './models/ItemTypeModel';
import CatalogItem from './components/CatalogItem';

function App() {

  const BASKET_BASE_URL = "http://localhost:5286/basket-bff-controller";
  const CATALOG_BASE_URL = "http://localhost:5288/catalog-bff-controller";
  const DEFAULT_QUANTITY = 1;

  const [category, setCategory] = useState(0);
  const [brand, setBrand] = useState(0);
  const [type, setType] = useState(0);

  const [data, setData] = useState<CatalogItemModel[]>([]);
  const [categories, setCategories] = useState<ItemCategoryModel[]>([]);
  const [types, setTypes] = useState<ItemTypeModel[]>([]);
  const [brands, setBrands] = useState<ItemBrandModel[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [orderId, setOrderId] = useState(0);

  //const [basketItems, setBasketItems] = useState<BasketItemModel[]>([]);
  const [count, setCount] = useState(0);
  // TODO auth
  const [user, setUser] = useState(null);

  // const navigate = useNavigate();

  const loadData = async() => {
    setIsLoading(true);
    await axios.get(`${CATALOG_BASE_URL}/catalog-items?category=${category}&type=${type}&brand=${brand}`)
    .then(result => {
      setData(result.data)
      setIsLoading(false)
    })
    .catch(err => {
      console.log(err.message)
      setIsLoading(false)
    })
  }

  const getCategories = async() => {
    setIsLoading(true);
    await axios.get(`${CATALOG_BASE_URL}/categories`)
    .then(result => {
      setCategories(result.data)
      setIsLoading(false)
    })
    .catch(err => {
      console.log(err.message)
      setIsLoading(false)
    })
  }

  const getTypes = async() => {
    setIsLoading(true);
    await axios.get(`${CATALOG_BASE_URL}/types`)
    .then(result => {
      setTypes(result.data)
      setIsLoading(false)
    })
    .catch(err => {
      console.log(err.message)
      setIsLoading(false)
    })
  }

  const getBrands = async() => {
    setIsLoading(true);
    await axios.get(`${CATALOG_BASE_URL}/brands`)
    .then(result => {
      setBrands(result.data)
      setIsLoading(false)
    })
    .catch(err => {
      console.log(err.message)
      setIsLoading(false)
    })
  }

  const setNewType = (id: number) => {
    setType(id);
    console.log('type ' + id)
  }

  const setNewCategory = (id: number) => {
    setCategory(id);
    console.log('category ' + id)
  }

  const setNewBrand = (id: number) => {
    setBrand(id);
    console.log('brand ' + id)
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
    if (filter === 1) {
      setData((prevData) => [...prevData].sort((a, b) => a.price - b.price));
    } else if (filter === 2) {
      setData((prevData) => [...prevData].sort((a, b) => b.price - a.price));
    }
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
        categories={categories} 
        setCategory={setNewCategory} 
        setNewBrand={setNewBrand} 
        brands={brands} 
        count={count}
      />
      <div className="row">
        <div className="col-lg-3 col-4">
        <SideBar 
          types={types} 
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
                element={<Home items={data} 
                brands={brands} 
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
                  brands={brands} 
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
