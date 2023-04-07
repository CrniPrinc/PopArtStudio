import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setIsLoggedIn } from "../../slices/userSlice";
import Header from "./header"

const Layout = ({childrens}) => {
    const dipsatch = useDispatch();
    const [isLoggedIn, setLoggedIn] = useState(getCurrentUserFromLocalStorage());
    
    useEffect(() => {
        setLoggedIn(getCurrentUserFromLocalStorage());
    },[])

    useEffect(() => {
        if(isLoggedIn){
            dipsatch(setIsLoggedIn({isLoggedIn:true, user: getCurrentUserFromLocalStorage()}));
        };
    },[isLoggedIn])

    function getCurrentUserFromLocalStorage () {
        const user = JSON.parse(localStorage.getItem("currentUser")) || {};
      
        const isLoggedIn = user.hasOwnProperty("username") && user.hasOwnProperty("password");

        if(isLoggedIn){
            return user;
        }
        return isLoggedIn;
      }
      
    return <>
        <Header />
        {
            childrens
        }
    </>
}

export default Layout;