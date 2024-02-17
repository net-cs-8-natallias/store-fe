import { BASKET_PATH, HOME_PATH, LOGIN_PATH, LOGOUT_PATH } from '../config/route-config'
import { FaShoppingBasket } from "react-icons/fa";
import { ItemCategoryModel } from '../models/ItemCategoryModel';
import { useState } from 'react';
import { ItemBrandModel } from '../models/ItemBrandModel';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { StateType } from '../redux/store';
import { UserData } from '../models/UserData';

interface Props {
    setCategory: (id: number) => void
    setNewBrand: (brandName: number) => void
}
const Navigator = ({setCategory, setNewBrand}: Props) => {

  const [brand, setBrand] = useState('');
  const categories: ItemCategoryModel[] = useSelector<StateType, ItemCategoryModel[]>(state => state.categories);
  const brands: ItemBrandModel[] = useSelector<StateType, ItemBrandModel[]>(state => state.brands);
  const count: number = useSelector<StateType, number>(state => state.count);
  const user: UserData = useSelector<StateType, UserData>(state => state.userData);

  const handleBrand = () => {
    setNewBrand(brands.filter(e => e.brand.toLowerCase().includes(brand.trim().toLowerCase()))[0].id)
    setBrand('')
  }

  return (
     <>
      <nav className="navbar navbar-expand-lg bg-dark border-bottom border-body">
        <div className="container-fluid">
            <a className="navbar-brand" href={HOME_PATH}><span style={{color: 'white', fontWeight: 'bold', }}>STO</span><span style={{color: '#1a903e', fontWeight: 'bold', fontSize: '25px'}}>RE</span></a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation" style={{background: 'white'}}>
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <form className="d-flex me-auto" role="search">
                    <input 
                        onChange={(e) => {setBrand(e.target.value)}} 
                        className="form-control me-2" 
                        type="search" 
                        placeholder="brand" 
                        aria-label="Search"
                        value={brand}
                        />
                    <Link
                        to={HOME_PATH} 
                        className="btn btn-outline-success" 
                        onClick={handleBrand} 
                        >
                        Search
                    </Link>
                </form>
                 
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    {
                        categories.map((e, i) => {
                            return <li 
                                key={e.id} 
                                className="nav-item" 
                                >
                                <Link
                                    to={HOME_PATH} 
                                    className="nav-link active mx-4"
                                    style={{ color: 'white', fontSize: '15px', fontWeight: 'bold' }}
                                    onClick={() => setCategory(e.id)}
                                >
                                {e.category}
                                </Link>
                            </li>
                        })
                    }
                </ul>
                <ul className="navbar-nav mb-2 mb-lg-0">
                {
                    // user.token !== ""
                    user
                    ? (<>
                    {/* <li className="nav-item nav-link active mx-4" style={{ color: 'white', fontSize: '15px', fontWeight: 'bold' }}>
                        {user.name}
                    </li> */}
                    <li className="nav-item">
                        <Link
                            to={LOGOUT_PATH} 
                            className="nav-link active mx-4"
                            style={{ color: 'white', fontSize: '15px', fontWeight: 'bold' }}
                            >
                            LOGOUT
                        </Link>
                    </li>
                    </>) 
                    : (<li className="nav-item">
                        <Link
                            to={LOGIN_PATH} 
                            className="nav-link active mx-4"
                            style={{ color: 'white', fontSize: '15px', fontWeight: 'bold' }}
                            >
                            LOGIN
                        </Link>
                    </li>)
                }
                <li className="nav-item">
                    <Link
                        to={BASKET_PATH} 
                        className="nav-link active mx-4"
                        style={{ color: 'white', fontSize: '15px', fontWeight: 'bold' }}
                        >
                        <FaShoppingBasket style={{color: 'white'}}/>
                        {
                        count !== 0 && <span className="badge badge-success" style={{background: 'green', borderRadius: '25px'}}>{count}</span>
                    }
                    </Link>
                </li>
                </ul>
            </div>
        </div>
    </nav>
    </>
  )
}

export default Navigator

