 import { createContext, useContext,useState,useEffect } from "react";

//import { Children, createContext } from "react";

export const AuthContext=createContext();

export const AuthProvider=({children})=>{
    const [token, settoken] = useState(localStorage.getItem("token"))
    const [user, setuser] = useState("")
    const [isLoading, setisLoading] = useState(true)
    const UserAuthorization= `Bearer ${token}`;

    const storeTokenInLs=(serverToken)=>{
        settoken(serverToken)
        return localStorage.setItem("token",serverToken);
    };
// for User log out
    const LogOutUser=()=>{
        settoken("")
        setuser("")
        return localStorage.removeItem("token");
    }
//it check the token is present or not
    let isLoggedIn=!!token;
    console.log("logedin",isLoggedIn)

    //JWT Authentication- to get the currently loggedIn user data
    const userAuthentication= async()=>{
        //added to solve the refreshing admin tab problem in navbar 
        if (!token) {
            setisLoading(false);
            return;
          }
        try {
            setisLoading(true)
            const response= await fetch("http://127.0.0.2:5000/api/auth/user",{
                method:"GET",
                headers:{
                    Authorization: UserAuthorization,
                }
            })

            if(response.ok){
                const data= await response.json();
                console.log("user data",data.userData);
                setuser(data.userData);
                // setisLoading(false)
            }
            // else{
            //     console.log("error while fetching response!")
            //     setisLoading(false)
            // }
        } catch (error) {
            console.log("Error to fetching user data");
        }
    }

    useEffect(() => {
    userAuthentication();
    }, [token])

    return (
        <AuthContext.Provider value={{user,isLoggedIn,LogOutUser,storeTokenInLs, UserAuthorization,isLoading}}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth=()=>{
    const authContextValue=useContext(AuthContext);
    if(!authContextValue){
        throw new Error("useAuth used outside of the Provider");
    }
    return authContextValue;
}

// export const AuthContext=createContext();

// export const AuthProvider=({children})=>{
//      const StoreToken=(serverToken)=>{
//         return localStorage.setItem("Token",serverToken);
//     }
//     return <AuthContext.Provider value={{StoreToken}}> 
//         {children}
//     </AuthContext.Provider>
// }
