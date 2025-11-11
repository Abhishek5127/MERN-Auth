import axios from "axios";
import { createContext,useEffect,useState } from "react";

export const AppContent = createContext();

export const AppContextProvider =(props)=>{

    
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const [isLoggedin, setIsLoggedin] = useState(false);
    const [userData, setUserData] = useState(false);
    const [Loading, setLoading] = useState(false)


    const getAuthState = async () => {
    try {
      axios.defaults.withCredentials = true; // ✅ important for cookies
      const { data } = await axios.post(`${backendUrl}/api/auth/is-auth`);

      if (data.success) {
        setIsLoggedin(true);
        setUserData(data.user);
      } else {
        setIsLoggedin(false);
        setUserData(null);
      }
    } catch (error) {
      console.error("Auth check failed:", error);
      setIsLoggedin(false);
      setUserData(null);
    } finally {
      setLoading(false);
    }
  };

    const getUserData = async()=>{
        try {
            const { data } = await axios.get(`${backendUrl}/api/user/data`);
            data.success? setUserData(data.userData):alert(data.message)
        } catch (error) {
            console.error(error)
      alert("Something went wrong")
        }
    }


    

    useEffect(() => {
      getAuthState();
    }, [])
    


    const value={
        backendUrl,
        isLoggedin,setIsLoggedin,
        userData,setUserData,
        getUserData
    }

    return(
        <AppContent.Provider value={value}>
            {props.children}
        </AppContent.Provider>
    )
    
}
