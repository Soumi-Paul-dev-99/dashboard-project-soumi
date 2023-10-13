import React , {useState} from "react";
import "./Otp.css"
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
// import {useHistory} from "react-router-dom"

const Otp = () => {
    // const history = useHistory()
    const navigate = useNavigate()
    const location = useLocation()
    console.log("location state", location.state.email
    );

    const [newUser, setNewUser] = useState(
        {
   
    OTP:"",
  email:location.state.email
     }
    );
console.log("newUser",newUser);
    const handleChange = (e)=>{
        setNewUser({...newUser, [e.target.name]: e.target.value})
    }

    const handleSubmit = async(e) =>{
        e.preventDefault();

        try {
          const res = await  axios.post("http://localhost:5000/users/otp/", newUser)
            //   .then(res =>{
            //       console.log('resss', res);
            //       alert(res.data.message)
            //       setOtp(res.data.user)
            //     //    history.push("/")
            //     navigate('/')
            //   })
            console.log(res,"res");
            alert(res.data.success)

            //  localStorage.setItem("otp",res.data.userid)
            navigate("/reset-password", { state: { OTP: newUser.OTP } })

          } catch (error) {
              console.log("error",error)
  
              alert("please enter correct OTP",error)
          }
  }
   

  return (
   
    <form onSubmit={handleSubmit} >
        <div className="container1">
         <div className='register'>
         <h1>Enter Your OTP</h1>
      
         <input type="text" placeholder="OTP" name="OTP" value={newUser.OTP}  onChange={handleChange}/>
         
         <div className='button' onClick={handleSubmit}>Submit</div>

<div className='Link1'onClick={()=>navigate("/login")}>Cancel</div> 
 
        </div>
        </div>
    </form>
)

}

export default Otp
