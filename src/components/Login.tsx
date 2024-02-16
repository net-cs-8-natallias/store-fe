import { useEffect } from 'react'
import { authService } from '../config/service-config';
import { useDispatch } from 'react-redux';
import { setUserData } from '../redux/actions';


const Login = () => {
  const dispatch = useDispatch<any>();

  
  useEffect(() => {
    const userLogin = async() => {
      await authService.login();
      const user = await authService.getUser();
      dispatch(setUserData(user))
    }
    userLogin()
  }, [])

  
  return (
    <></>
  )
}

export default Login


// import { useState } from "react";

// interface Props {
//   setUser?: (user: any | null) => void
// }

// const Login = ({setUser}: Props) => {

//   const [isLoading, setIsLoading] = useState(false);

//   const handleLogin = () => {
//     //TODO
//   }

//   return (
//     <div className="container d-flex justify-content-center" style={{width: '100%'}}>
//       <div className="row ">
//         <div style={{width: '100%'}} >
//           <div className="col col-12" >
//             <h1 className='d-flex justify-content-center'>Login</h1>
//             <div className="mb-4 ">
//               <label className="form-label" style={{fontWeight: 'bold', color: 'rgb(81, 141, 81)'}}>User name</label>
//               <input type="text" className="form-control form-control-lg d-flex justify-content-center" />
//             </div>
//             <div className="mb-4">
//               <label className="form-label" style={{fontWeight: 'bold', color: 'rgb(81, 141, 81)'}}>Email address</label>
//               <input type="password" className="form-control form-control-lg d-flex justify-content-center" />
//             </div>
//             <button onClick={handleLogin} className='btn btn-outline-success btn-lg' style={{width: '100%'}}>Signin</button>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default Login
