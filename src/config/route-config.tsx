import Basket from "../components/Basket";
import CatalogItem from "../components/CatalogItem";
import Home from "../components/Home";
import Login from "../components/Login";
import Logout from "../components/Logout";
import { RouteType } from "../models/RouteType";

export const HOME_PATH = '/';
export const LOGIN_PATH = '/login';
export const LOGOUT_PATH = '/logout';
export const BASKET_PATH = '/basket';
export const ITEM_PATH = '/item/:itemId';
export const CHECK_OUT_PATH = '/checkout'

export const ROUTES: RouteType[] = [
    {path: HOME_PATH, lable: 'Home', element: <Home/>},
    {path: LOGIN_PATH, lable: 'Login', element: <Login/>},
    {path: LOGOUT_PATH, lable: 'Logout', element: <Logout/>},
    {path: BASKET_PATH, lable: 'Basket', element: <Basket/>},
    {path: ITEM_PATH, lable: 'Item', element: <CatalogItem />},
]

