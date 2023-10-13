import React from 'react'
import "./homePage.css"
import { useNavigate } from 'react-router-dom'
// import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
const HomePage = () => {
  // const history = useHistory()
  const navigate = useNavigate()


  const handleLogout = () => {
    localStorage.removeItem("user")
    // setLoginUser({})
    // history.push('/')
    navigate('/login')
  }
  return (
    <div className='homepage'>
      <h1>Admin Dashboard</h1>
      <div className='button' onClick={handleLogout}>
       Logout
      </div>
      {/* <div className='button' onClick={()=>setLoginUser({})}>
       Logout
      </div> */}
    </div>
  )
}

export default HomePage;
