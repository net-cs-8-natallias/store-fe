import { Link } from 'react-router-dom'
import { ItemTypeModel } from '../models/ItemTypeModel'
import { HOME_PATH } from '../config/route-config'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { StateType } from '../redux/store'

interface Props {
    setType: (id: number) => void
}

const SideBar = ({setType}: Props) => {

    const [selectedType, setSelectedType] = useState<number>(0);
    const types: ItemTypeModel[] = useSelector<StateType, ItemTypeModel[]>(state => state.types);

    return (
    <div style={{ minHeight: '100vh'}} >
            <ul className='list-group type-list '>
            <li 
                onClick={() => { setType(0); setSelectedType(0); }} 
                className={`list-group-item ${selectedType === 0 ? 'pressed_type_item' : 'type_item'}`}
            >
                    All types
            </li>
            {
                types.map((type, i) => (
                    <li 
                    className={`list-group-item ${selectedType === type.id ? 'pressed_type_item' : 'type_item'}`}
                    key={type.id} 
                    onClick={() => setSelectedType(type.id)}
                    >
                        <Link
                        to={HOME_PATH} 
                        className="nav-link active mx-4"
                        style={{fontSize: '15px', fontWeight: 'bold' }}
                        onClick={() => setType(type.id)}
                        >
                            {type.type}
                        </Link>
                    </li>
                ))
            }
            </ul>
        </div>
  )
}

export default SideBar
