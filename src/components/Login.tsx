import { useEffect } from 'react'
import { authService } from '../config/service-config';

const Login = () => {
  //const dispatch = useDispatch<any>();

  
  useEffect(() => {
    const userLogin = async() => {
      await authService.login();
      await authService.getUser();
    }
    userLogin()
  }, [])

  
  return (
    <></>
  )
}

export default Login

