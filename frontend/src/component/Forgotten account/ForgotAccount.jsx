import React , {useState} from "react";
import "./ForgotAccount.css"
import axios from "axios";
// import {useHistory} from "react-router-dom"
import { useNavigate } from 'react-router-dom'

const ForgotAccount = () => {

    //   const history = useHistory()
 const navigate = useNavigate()
    const [newUser, setNewUser] = useState(
        {
   
    email:"",
  
     }
    );
console.log("newUser",newUser);
    const handleChange = (e)=>{
        setNewUser({...newUser, [e.target.name]: e.target.value})
    }

    const handleSubmit = async(e) =>{
        e.preventDefault();
    //     const formData = new FormData()
    //    formData.append("email",newUser.email);
    //     formData.append("password",newUser.password);
    //     console.log('newUser', newUser);

        try {
    const res = await  axios.post("http://localhost:5000/users/ForgotPassword/", newUser)
            // .then(res =>{
            //     console.log('resss', res);
            //     alert(res.data.message)
            //     setOtp(res.data.user)
            //     //  history.push("/Otp")
            //      navigate('/')
            // })
            console.log(res,"res")
            alert(res.data.message)

            localStorage.setItem("user", res.data.userid)
            navigate("/Otp", { state: { email: newUser.email } })
          
        } catch (error) {
            console.log("error",error)

            alert("invalid input",error)
        }
}
 

     return (
   
    <form onSubmit={handleSubmit} >
        <div className="container1">
         <div className='register'>
         <h1>Find Your Account</h1>
       <h4>Please enter your email address or mobile number to search for your account</h4>
         <input type="email" placeholder="Email address or phone number" name="email" value={newUser.email}  onChange={handleChange}/>
         
        
      
<div className='button' onClick={handleSubmit}>Search</div>

<div className='Link1'onClick={()=>navigate("/Login")}>Cancel</div> 

 
        </div>
        </div>
    </form>
)


  
}

export default ForgotAccount
