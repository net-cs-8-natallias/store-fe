import { BASKET_PATH, HOME_PATH, LOGIN_PATH, LOGOUT_PATH } from '../config/route-config'
import { FaShoppingBasket } from "react-icons/fa";
import { ItemCategoryModel } from '../models/ItemCategoryModel';
import { useEffect, useState } from 'react';
import { ItemBrandModel } from '../models/ItemBrandModel';
import { Link } from 'react-router-dom';

interface Props {
    user?: string,
    categories: ItemCategoryModel[],
    brands: ItemBrandModel[]
    setCategory: (id: number) => void
    setNewBrand: (brandName: number) => void
}
const Navigator = ({user, categories, setCategory, setNewBrand, brands}: Props) => {

  const [brand, setBrand] = useState('');


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
                    <button 
                        onClick={() => setNewBrand(brands.filter(e => e.brand.toLowerCase().includes(brand.trim().toLowerCase()))[0].id)} 
                        className="btn btn-outline-success" 
                        type="submit">
                            Search
                    </button>
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
                    user 
                    ? (<li className="nav-item">
                        <a className="navbar-brand mx-2" href={LOGOUT_PATH} style={{color: 'white', fontSize: '20px'}}>Logout</a>
                    </li>) 
                    : (<li className="nav-item">
                        <a className="navbar-brand mx-2 " href={LOGIN_PATH} style={{color: 'white', fontSize: '20px'}}>Login</a>
                    </li>)
                }
                <li className="nav-item">
                <a className="navbar-brand mx-2" href={BASKET_PATH}><FaShoppingBasket style={{color: 'white'}}/>
                    <span className="badge badge-success" style={{background: 'green', borderRadius: '25px'}}>3</span>
                </a>
                </li>
                </ul>
            </div>
        </div>
    </nav>
    </>
  )
}

export default Navigator

