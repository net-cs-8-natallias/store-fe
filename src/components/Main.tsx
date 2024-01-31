import React from 'react'

const Main = ({children}: any) => {
  return (
    <div className='col-lg-10 col-9' style={{ height: '100vh' }}>
      {children}
    </div>
  )
}

export default Main
