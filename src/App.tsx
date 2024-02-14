// import React, { useState, useEffect } from 'react';
// import Oidc from 'oidc-client';

// const App = () => {
//   const [user, setUser] = useState<any>(null);

//   const config = {
//     authority: 'http://localhost:7001',
//     client_id: 'ReactClient',
//     redirect_uri: 'http://localhost:5173/signin-oidc',
//     response_type: 'code',
//     scope: 'openid profile catalog',
//     post_logout_redirect_uri: 'http://localhost:5173/signout-callback-oidc',
//   };

//   const mgr = new Oidc.UserManager(config);

//   const loadUser = async () => {
//     try {
//       const currentUser = await mgr.getUser();
//       setUser(currentUser);
//     } catch (error) {
//       console.error('Error loading user:', error);
//     }
//   };
//   useEffect(() => {
//     loadUser();
//   }, []);

//   const login = async () => {
//     try {
//       console.log('Login function called');
//       await mgr.signinRedirect();
//       //await mgr.signinRedirectCallback();
//     } catch (error) {
//       console.error('Error during login:', error);
//     }
//   };

//   const api = async () => {
//     await loadUser();
//     try {
//       console.log('Api function called');
//       const currentUser = await mgr.getUser();
//       console.log(currentUser)
  
//       if (currentUser && currentUser.access_token) {
//         console.log('User authenticated:', currentUser.profile);
  
//         const url = 'http://localhost:5288/catalog-bff-controller/catalog-items';
  
//         const response = await fetch(url, {
//           method: 'GET',
//           headers: {
//             Authorization: `Bearer ${currentUser.access_token}`,
//           },
//         });
  
//         if (response.ok) {
//           const data = await response.json();
//           console.log('API Response:', data);
//         } else {
//           console.error('API Error:', response.statusText);
//         }
//       } else {
//         console.error('User or access_token not available');
//       }
//     } catch (error) {
//       console.error('Error during API call:', error);
//     }
//   };
  

//   const logout = async () => {
//     try {
//       console.log('Logout function called');
//       await mgr.signoutRedirect();
//     } catch (error) {
//       console.error('Error during logout:', error);
//     }
//   };

//   return (
//     <div>
//       <div>Hello</div>
//       <button onClick={login}>Login</button>
//       <button onClick={api}>Api</button>
//       <button onClick={logout}>Logout</button>
//       <div>{user ? `User logged in: ${user.profile.name}` : 'User not logged in'}</div>
//     </div>
//   );
// };

// export default App;

import React, { useState, useEffect } from 'react';
import Oidc from 'oidc-client';

const App = () => {
  const [user, setUser] = useState<any>(null);

  const config = {
    authority: 'http://localhost:7001',
    client_id: 'ReactClient',
    redirect_uri: 'http://localhost:5173/',
    response_type: 'code',
    scope: 'openid profile catalog',
    post_logout_redirect_uri: 'http://localhost:5173/signout-callback-oidc',
  };

  const mgr = new Oidc.UserManager(config);

  const loadUser = async () => {
    try {
      const currentUser = await mgr.getUser();
      console.log('current user ' + currentUser)
      setUser(currentUser);
    } catch (error) {
      console.error('Error loading user:', error);
    }
  };
  
  useEffect(() => {

    const callbackGetUser = async() => {
      try{
      const user = await mgr.signinRedirectCallback();
      console.log(user);
      setUser(user);
      }catch(ex){
        console.log(ex);
      }
    }
    const search = new URLSearchParams(location.search);
    const code = search.get('code');
    if (code) {
      callbackGetUser();
    }else{
      loadUser();
    }
  }, [location.search]);

  const login = async () => {
    try {
      console.log('Login function called');
      console.log(await mgr.signinRedirect());
    } catch (error) {
      console.error('Error during login:', error);
    }
    await loadUser()
  };

  const api = async () => {
    try {
      console.log('Api function called');
      const currentUser = await mgr.getUser();
  
      if (currentUser && currentUser.access_token) {
        console.log('User authenticated:', currentUser.profile);
  
        const url = 'http://localhost:5288/catalog-bff-controller/catalog-items';
  
        const response = await fetch(url, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${currentUser.access_token}`,
          },
        });
  
        if (response.ok) {
          const data = await response.json();
          console.log('API Response:', data);
        } else {
          console.error('API Error:', response.statusText);
        }
      } else {
        console.error('User or access_token not available');
      }
    } catch (error) {
      console.error('Error during API call:', error);
    }
  };
  

  const logout = async () => {
    try {
      console.log('Logout function called');
      await mgr.signoutRedirect();
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  return (
    <div>
      <div>Hello</div>
      <button onClick={login}>Login</button>
      <button onClick={api}>Api</button>
      <button onClick={logout}>Logout</button>
      <div>{user ? `User logged in: ${user.profile.name}` : 'User not logged in'}</div>
    </div>
  );
};

export default App;


// import { useEffect, useState } from 'react'
// import './App.css'
// import { BrowserRouter, Route, Routes} from 'react-router-dom';
// import { ROUTES } from './config/route-config';
// import Navigator from './navigator/Navigator';
// import SideBar from './navigator/SideBar';
// import Main from './components/Main';
// import { useDispatch, useSelector} from 'react-redux';
// import { basketService, catalogService } from './config/service-config';
// import { setBasket, setBrands, setCatalog, setCategories, setItemsCount, setTypes } from './redux/actions';
// import { BasketItemModel } from './models/BasketItemModel';
// import { RouteType } from './models/RouteType';
// import { ItemBrandModel } from './models/ItemBrandModel';
// import { StateType } from './redux/store';



// function App() {
//   const dispatch = useDispatch<any>();
//   const brands: ItemBrandModel[] = useSelector<StateType, ItemBrandModel[]>(state => state.brands);

//   const [category, setCategory] = useState(0);
//   const [brand, setBrand] = useState(0);
//   const [type, setType] = useState(0);
//   const [isLoading, setIsLoading] = useState(false);

//   const loadData = async() => {
//     setIsLoading(true);
//     let data = await catalogService.getCatalog({
//       category: category,
//       type: type,
//       brand: brand
//     });
//     dispatch(setCatalog(data));
//     setIsLoading(false)
//     // TODO error handler
//   }

//   const getCategories = async() => {
//     setIsLoading(true);
//     const data = await catalogService.getCategories()
//     dispatch(setCategories(data));
//     setIsLoading(false)
//     // TODO error handler
//   }

//   const getTypes = async() => {
//     setIsLoading(true);
//     const data = await catalogService.getTypes()
//     dispatch(setTypes(data));
//     setIsLoading(false)
//     // TODO error handler
//   }

//   const getBrands = async() => {
//     setIsLoading(true);
//     const data = await catalogService.getBrands()
//     dispatch(setBrands(data));
//     setIsLoading(false)
//     // TODO error handler
//   }

//   const setNewType = (id: number) => {
//     setType(id);
//   }

//   const setNewCategory = (id: number) => {
//     setCategory(id);
//   }

//   const setNewBrand = (id: number) => {
//     setBrand(id);
//   }

//   useEffect(() => {
//     loadData()
//   }, [type, category, brand])

//   useEffect(() => {
//     loadData();
//     getCategories();
//     getBrands();
//     getTypes();
//     loadBasket()
//   }, [])

//   const loadBasket = async() => {
//     setIsLoading(true)
//     const basketItems = await basketService.getBasket();
//     const count = basketItems.reduce((res: number, cur: BasketItemModel) => res += cur.quantity, 0);
//     dispatch(setItemsCount(count))
//     dispatch(setBasket(basketItems))
//     setIsLoading(false)
//   }

//   const setNewUser = () => {
//     // TODO auth
//   }

//   return (
//     <BrowserRouter >
//     <div className="container-fluid" style={{ padding: '0', margin: '0', overflowX: 'hidden' }}> 
//       <Navigator 
//         setCategory={setNewCategory} 
//         setNewBrand={setNewBrand} 
//       />
//       <div className="row ">
//         <div className="col-lg-3 col-4 ">
//         <SideBar 
//           setType={setNewType}
//         />
//         </div>
//         <Main>

//           <div className="col-lg-4 col-6 mt-3">
//             {brand !== 0 
//             && <>
//               <div className='d-flex justify-content-center'>
//                 <h2>{brands.find(e => e.id == brand)?.brand} </h2>
//                 <button onClick={() => setBrand(0)} type="button" className="btn-close" aria-label="Close"></button>
//               </div>
//             </>}
//           </div>

//         {
//           isLoading 
//           ? (
//             <div className='conteiner d-flex justify-content-center m-5'>
//               <div className="spinner-border text-success" role="status">
//               </div>
//             </div>
//           ) 
//           : ( 
//             <Routes>
//               { getRoutes(ROUTES) }
//             </Routes> 
//           )
//         }
//         </Main>
//       </div>
//     </div>
//       </BrowserRouter>
//   )
// }

// export default App

// const getRoutes = (routes: RouteType[]) => {
//   return routes.map((e) => <Route key={e.path} path={e.path} element={e.element}/>)
// }



