import React from 'react'
import '../css/Header.css'
import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { assets } from '../assets/assets'
import axios from 'axios'
import { AppContent } from '../context/AppContext'



const Header = () => {
    const {userData} = useContext(AppContent);

    const navigate = useNavigate()
    return (
        <div className='headerContainer'>
            <div className="contentContainer">
                <h3>Rewire- Remap Your Brain!</h3>
                <div className="userName">{`Hey ${userData? userData.name:"User"},`}</div>
                <span>Rewire uses advanced methods for advanced functioning of neurons help making super humans real. Rewire give users an optimistic way to learn and implement advanced binaural shit!!</span>
                <button onClick={() => navigate('/signup')} className="getStarted">Get Started</button>
            </div>
            <div className="imageContainer">
                <img className='girlImg' draggable="false" src={assets.headerImg} alt="headerimage" />
            </div>

        </div>
    )
}

export default Header
