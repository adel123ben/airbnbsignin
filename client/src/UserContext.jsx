import { createContext, useEffect, useState } from "react";
import  axios from "axios";

export const UserContext = createContext({});

export function UserContextProvider({children}) {
    const [user, setUser] = useState(null);
    const [redy, setRedy] = useState(false);
    useEffect(() => {
        if(!user) {
           const {data} = axios.get('/profile').then(({data}) => {
               setUser(data);
               setRedy(true);
           });
        
        }
    }, [])
    return (
     <UserContext.Provider value={{user, setUser, redy}}>
        {children}
     </UserContext.Provider>
            
        
    )

}