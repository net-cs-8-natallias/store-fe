import { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { authService } from '../config/service-config';
import { setUserData } from '../redux/actions';
import { emptyUserData } from '../models/UserData';
import { HOME_PATH } from '../config/route-config';
import { useNavigate } from 'react-router-dom';

const Logout = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    logoutUser();
  }, [])

  const logoutUser = async () => {
    await authService.logout();
    dispatch(setUserData(emptyUserData))
    navigate(HOME_PATH);
  }
  
  return (
    <></>
  )
}

export default Logout
