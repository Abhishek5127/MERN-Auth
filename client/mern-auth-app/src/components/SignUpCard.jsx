import React, { useContext, useState } from 'react'
import '../css/SignUpCard.css'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import { AppContent } from '../context/AppContext'
import axios from 'axios'

const SignUpCard = () => {
  const { backendUrl, setIsLoggedin } = useContext(AppContent)

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate()

  const onSubmitHandler = async (e) => {
    e.preventDefault()

    try {
      axios.defaults.withCredentials = true

      const { data } = await axios.post(`${backendUrl}/api/auth/register`, {
        name,
        email,
        password,
      })

      if (data.success) {
        // ✅ setisLoggedin must be called like a function, not assigned!
        setIsLoggedin(true)
        navigate('/')
      } else {
        alert(data.message)
      }
    } catch (error) {
      console.error(error)
      alert('Something went wrong while signing up.')
    }
  }

  return (
    <div className="SignUpCardContainer">
      <form onSubmit={onSubmitHandler}>
        <div className="signUpContainer">
          <h2 className="white">
            Sign Up
            <img src={assets.Register} alt="" />
          </h2>

          <div className="emailContainer">
            <h4>Name</h4>
            <input
              onChange={(e) => setName(e.target.value)}
              value={name}
              placeholder="Elon Mast"
              type="text"
              className="name"
              required
            />
          </div>

          <div className="emailContainer">
            <h4>Email</h4>
            <input
              onChange={(e) => setEmail(e.target.value)}
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
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              type="password"
              className="password"
              required
            />
          </div>

          <button type="submit" className="register">
            Register
          </button>

          <div className="loginAcc">
            <p>Already have an Account?</p>
            <span onClick={() => navigate('/login')}>Login Here</span>
          </div>
        </div>
      </form>
    </div>
  )
}

export default SignUpCard
