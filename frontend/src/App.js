import './App.css';
import Homepage from './component/HomePage/HomePage';
import Register from './component/Register/Register';
import Login from './component/Login/Login';
import Otp from './component/OTP page/Otp';
import ForgotAccount from './component/Forgotten account/ForgotAccount';
// import {BrowserRouter as Router , Switch , Route} from "react-router-dom";
import { useEffect, useState } from 'react';
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom';
import HomePage from './component/HomePage/HomePage';
import ResetPassword from './component/resetPassword/ResetPassword';


function App() {

  const [user, setUser] = useState('')
   const [otp, setOtp] = useState('')

  console.log('userrr', user);

//   useEffect(()=> {
//   // const getUser =  localStorage.getItem("user")
//   // console.log("getUser", getUser);
//   // setUser(getUser)
//  if(user){
//       localStorage.setItem("user", user)
//     }
//   },[user])

  useEffect(()=> {
  const getUser =  localStorage.getItem("user")
  console.log("getUser", getUser);
  setUser(getUser)
  
 
  },[])
  console.log("user", user);

  useEffect(()=> {
    const getOtp =  localStorage.getItem("otp")
    console.log("getOtp", getOtp);
    setOtp(getOtp)
    
   
    },[])
    console.log("otp", otp);


  return (
    <div className="App">
<BrowserRouter>
<Routes>
  {
    user  ? (
      <Route path='/' element={<HomePage />} />
) : 
    (
      <Route path='/login' element={<Login  />} />
    )
  }
  <Route path='/register' element={<Register />} />
  

  {/* {
    otp  ? ( */}
      <Route path='/reset-password' element={<ResetPassword/>} />
 {/* ) :  
    ( */}
       <Route path='/login' element={<Login />} /> 
    {/* )
   }  */}


  <Route path='/ForgotAccount' element={<ForgotAccount  />} />

{/* {
    otp  ? (
      <Route path='/ResetPassword' element={<ResetPassword />} />
) : 
    (
      <Route path='/login' element={<Login  />} />
    )
  }
  */}
 <Route path='/otp' element={<Otp  />} />
</Routes>

</BrowserRouter>


      {/* <Router>
        <Switch>
          <Route exact path ="/">
            {
              user  ? <Homepage setLoginUser={setLoginUser}/>
              :
              <Login setLoginUser={setLoginUser}/>
            }
          </Route>
          <Route path="/login" >{<Login setLoginUser={setLoginUser}/>}</Route>
          <Route path="/register"> {<Register/>}</Route>
        <Route exact path="/Otp">
          {
            otp ? <Otp/>: <Otp setOtp={setOtp}/>
          }
        </Route>
          <Route path="/forgotAccount"> {<ForgotAccount setOtp={setOtp}/>}</Route>
        
        </Switch>
      </Router>
  */}
 

      
    </div>
  );
}

export default App;
