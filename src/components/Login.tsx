import { useState } from "react";

interface Props {
  setUser: (user: any | null) => void
}

const Login = ({setUser}: Props) => {

  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = () => {
    //TODO
  }

  return (
    <div className="container d-flex justify-content-center mt-4" style={{width: '100%'}}>
      <div className="row ">
        <div style={{width: '100%'}} >
          <div className="col col-12" >
            <h1 className='d-flex justify-content-center m-5'>Login</h1>
            <div className="mb-4 ">
              <label className="form-label" style={{fontWeight: 'bold', color: 'rgb(81, 141, 81)'}}>User name</label>
              <input type="text" className="form-control form-control-lg d-flex justify-content-center" id="exampleFormControlInput1" />
            </div>
            <div className="mb-4">
              <label className="form-label" style={{fontWeight: 'bold', color: 'rgb(81, 141, 81)'}}>Email address</label>
              <input type="password" className="form-control form-control-lg d-flex justify-content-center" id="exampleFormControlInput1" />
            </div>
            <button onClick={handleLogin} className='btn btn-outline-success btn-lg' style={{width: '100%'}}>Signin</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
