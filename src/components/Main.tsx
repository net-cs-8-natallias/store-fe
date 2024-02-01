import React from 'react'

const Main = ({children}: any) => {
  return (
    <div className='col-lg-9 col-8' style={{ height: '100vh' }}>
      {children}
    </div>
  )
}

export default Main
