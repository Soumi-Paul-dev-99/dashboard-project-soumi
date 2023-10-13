import React , {useState , useRef} from "react";
import "./register.css"
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ReCAPTCHA from 'react-google-recaptcha';
// import {useHistory} from "react-router-dom"

const SITE_KEY = "6LdTX18nAAAAAKE0Cg_X3xBtSFhxFZf3dSMnIQVu"

const Register= ()=>{

// const history = useHistory()
const navigate = useNavigate()

    const [newUser, setNewUser] = useState(
        {
    name: "",
    fname:"",
    lname:"",
    email:"",
    password: "",
    reEnterPassword : "",
    birthdate:"",
    photo:"" ,
    // recaptchaValue:""
        }
    );

    const [recaptchaValue , setRecaptchaValue] = useState("");
    const captchaRef = useRef()

    const handleChange = (e)=>{
        setNewUser({...newUser, [e.target.name]: e.target.value})
    }

    const handlePhoto = (e)=>{
        setNewUser({...newUser, photo: e.target.files[0]})
    }
 
  

    const handleSubmit = async(e) =>{
        e.preventDefault();
        const formData = new FormData();
        formData.append("photo",newUser.photo);
        formData.append("birthdate", newUser.birthdate);
        formData.append("name",newUser.name);
        formData.append("fname",newUser.fname);
        formData.append("lname",newUser.lname);
        formData.append("email",newUser.email);
        formData.append("password",newUser.password);
        formData.append("reEnterPassword",newUser.reEnterPassword);
        formData.append("recaptchaValue", recaptchaValue);


console.log('captchaRef', captchaRef.current.reset());
       
           await axios.post("http://localhost:5000/users/register", formData).then((res) => {
            console.log("res", res);
            alert(res.data.message)
            navigate("/login")
          }).catch((err)=> {
          console.log("err", err);
          navigate("/login")
          });
            
               
    }

    const onChange = value  =>{
        console.log("value",value);
        setRecaptchaValue(value)
    }
    
return(
    
    <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="container1">
         <div className='register'>
         <h1>Registration Page</h1>
         <input type="text" placeholder="name" name="name" value={newUser.name}  onChange={handleChange}/>
         <input type="text" placeholder="fname" name="fname" value={newUser.fname}  onChange={handleChange}/>
         <input type="text" placeholder="lname" name="lname" value={newUser.lname}  onChange={handleChange}/>
         <input type="email" placeholder="email" name="email" value={newUser.email}  onChange={handleChange}/>
         
         <input type="password" placeholder="password" name="password" value={newUser.password}  onChange={handleChange}/>
         <input type="password" placeholder="reEnterPassword" name="reEnterPassword" value={newUser.reEnterPassword}  onChange={handleChange}/>
        <input type="date" name="birthdate" value = {newUser.date} onChange={handleChange}/>
        <input type="file" accept=".png, .jpg, .jpeg" name="photo" onChange={handlePhoto}/>
        {newUser.photo && (
            <img height={'150px'} width={'100px'} src={URL.createObjectURL(newUser.photo)}/>
        )}
<div className="form-group mt-2">
    <ReCAPTCHA sitekey={SITE_KEY} onChange={onChange} ref={captchaRef}/>
</div>
<div className='button' onClick={handleSubmit}>Register</div>
<div>or</div> 

<div className='button'onClick={()=>navigate("/login")}>Login</div> 
        </div>
        </div>
    </form>
)
        
}
export default Register;