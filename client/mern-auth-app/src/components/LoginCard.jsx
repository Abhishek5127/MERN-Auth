import React from 'react'
import '../css/LoginCard.css' // using the same theme file
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import { useState,useContext } from 'react'
import { AppContent } from '../context/AppContext'
import axios from 'axios'



const LoginCard = () => {

  const {backendUrl,setIsLoggedin,getUserData} = useContext(AppContent);
    
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const onSubmitHandler = async(e)=>{
    e.preventDefault();
    try {
      axios.defaults.withCredentials=true;
      const {data} = await axios.post(`${backendUrl}/api/auth/login`,{
        email,
        password
      })
      if(data.success){
        setIsLoggedin(true);
        getUserData()
        navigate('/')
      }
      else{
         alert(data.message)
      }
      
    } catch (error) {
      console.error(error)
      alert("Something Went Wrong");
      
    }
  }
  return (
    <div className="SignUpCardContainer">
      <form onSubmit={onSubmitHandler}>
        <div className="signUpContainer">
          <h2 className="white">
            Login
            <img src={assets.Login} alt="Login Icon" />
          </h2>

          <div className="emailContainer">
            <h4>Email</h4>
            <input
              onChange={(e)=>setEmail(e.target.value)}
              value={email}
              placeholder="elonmast@gmail.com"
              type="email"
              className="email"
              required
            />
          </div>

          <div className="passwordContainer">
            <h4>Password</h4>
            <input
              onChange={(e)=>setPassword(e.target.value)}
              type="password"
              className="password"
              placeholder="Enter your password"
              required
            />
          </div>

          <div className="forget">
            <div onClick={e=>navigate('/reset-password-otp')}>Forgot Password?</div>
          </div>

          <button type="submit" className="register">Login</button>

          <div className="loginAcc">
            <p>Don't have an account?</p>
            <span onClick={e=>navigate('/signup')}>Sign Up Here</span>
          </div>
        </div>
      </form>
    </div>
  )
}

export default LoginCard
