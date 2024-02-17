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
                    // className={`list-group-item ${selectedType === 0 ? 'pressed_type_item' : 'type_item'}`}
                    onClick={() => setSelectedType(0)}
                    >
                        <Link
                        className={`list-group-item px-4 ${selectedType === 0 ? 'pressed_type_item' : 'type_item'}`}
                        to={HOME_PATH} 
                        // className="nav-link active mx-4"
                        style={{fontSize: '15px', fontWeight: 'bold' }}
                        onClick={() => setType(0)}
                        >
                            All types
                        </Link>
                </li>
            {
                types.map((type, i) => (
                    <li 
                    key={type.id} 
                    onClick={() => setSelectedType(type.id)}
                    >
                        <Link
                        className={`list-group-item px-4 ${selectedType === type.id ? 'pressed_type_item' : 'type_item'}`}
                        to={HOME_PATH} 
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
