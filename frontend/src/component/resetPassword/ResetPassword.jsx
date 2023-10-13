import React , {useState} from "react";
import axios from "axios";

import { useLocation, useNavigate } from "react-router-dom";

// import {useHistory} from "react-router-dom"

const ResetPassword = () => {
 // const history = useHistory()
    const navigate = useNavigate()
    const location = useLocation()
console.log("location state", location.state.OTP)

    const [newUser, setNewUser] = useState(
       
        {

            OTP: location.state.OTP,
    newPassword:"",
    confirmPassword: "",
     }
    );
    console.log("newUser",newUser)

    const handleChange = (e)=>{
        setNewUser({...newUser, [e.target.name]: e.target.value})
    }

    const handleSubmit = async(e) =>{
        e.preventDefault();
        // const formData = new FormData()
    //    formData.append("email",newUser.email);
    //     formData.append("password",newUser.password);
    //    console.log('newUser', newUser);

        try {
     const res =  await  axios.post("http://localhost:5000/users/resetPassword/", newUser)
            // .then(res =>{
            //     console.log('resss', res);
            //     alert(res.data.message)
            //     setLoginUser(res.data.userid)
            //      history.push("/")
            // })
            console.log(res,"res")
            alert(res.data.message)
            // setUser(res.data.userid
            //     ) 
            // localStorage.setItem("user", res.data.userid)
            //  history.push("/")
            navigate('/login')
          
        } catch (error) {
            console.log("error",error)

                    }
}
 
  return (
   
    <form onSubmit={handleSubmit} >
        <div className="container1">
         <div className='register'>
         <h1>Reset Password</h1>
       
         <input type="password" placeholder="New Password" name="newPassword" value={newUser.newPassword}  onChange={handleChange}/>
         
         <input type="password" placeholder=" confirm Password" name="confirmPassword" value={newUser.confirmPassword}  onChange={handleChange}/>
      
<div className='button' onClick={handleSubmit}>Submit</div>
{/* 
<div className='Link1'onClick={()=>navigate("/Register")}>Register</div> 
<div className='Link2'onClick={()=>navigate("/ForgotAccount")}>Forgotten account?</div>  */}
        </div>
        </div>
    </form>
)

}

export default ResetPassword
