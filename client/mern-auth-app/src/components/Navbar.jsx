import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets.js'
import '../css/Navbar.css'
import { useNavigate } from 'react-router-dom'
import { AppContent } from '../context/AppContext.jsx'
import axios from 'axios'

const Navbar = () => {
  const { backendUrl, userData, setIsLoggedin, setUserData } = useContext(AppContent)
  const navigate = useNavigate()
  const [showMenu, setShowMenu] = useState(false)

  const handleLogout = async () => {
    try {
      axios.defaults.withCredentials = true;

      const { data } = await axios.post(`${backendUrl}/api/auth/logout`);

      if (data.success) {
        alert("Logged Out Succesfully");
        navigate('/')
        window.location.reload()
      } else {
        console.log(data.message);
      }

    } catch (error) {
      console.error(error);
      alert("something went wrong");
    }
  }

  return (
    <div className="nav">
      {/* Logo */}
      <div onClick={() => navigate('/')} className="logo">
        <img src={assets.Logo} alt="Logo" />
        <h2>REWIRE</h2>
      </div>

      {/* Profile / Auth Buttons */}
      {userData ? (
        <div
          className="profileWrapper"
          onMouseEnter={() => setShowMenu(true)}
          onMouseLeave={() => setShowMenu(false)}
        >
          <div className="profileContainer">
            {userData.name[0].toUpperCase()}
          </div>

          {/* Dropdown Menu */}
          {showMenu && (
            <ul className="profileDropdown">
              <li className="userName">
                <strong>{userData.name}</strong>
              </li>
              <li>{userData.email}</li>
              <hr />
              <li onClick={() => navigate('/profile-info')}>View Profile</li>
              <li onClick={() => navigate('/settings')}>Settings</li>
              <li onClick={handleLogout}>Logout</li>
            </ul>
          )}
        </div>
      ) : (
        <div className="userButtonsContainer">
          <button onClick={() => navigate('/signup')} className="signup">Sign Up</button>
          <button onClick={() => navigate('/login')} className="login">
            Login <img src={assets.Login} alt="login icon" />
          </button>
        </div>
      )}
    </div>
  )
}

export default Navbar
