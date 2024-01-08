import { useContext, useState } from "react"
import { UserContext } from "../UserContext"
import { Navigate, Link, useParams } from "react-router-dom"
import axios from "axios"


export default function Account() {
    const [toHome, setToHome] = useState(null);
    const {redy,user, setUser} = useContext(UserContext);
    async function logout(){
      await  axios.post('/logout');
      setUser(null);
      setToHome("/");
      
    }

    let {subpage} = useParams();

    if(subpage === undefined) {
        subpage = 'profile'
    }

    if(!redy) {
        return <div>
            <h1>Loading...</h1>
        </div>
    }

    if(redy && !user && !toHome) {
        return <Navigate to={'/login'} />
    }

  
   console.log(subpage);

   function LinkClases (type=null)  {
       let classes = 'py-2 px-6 ';
       if(type === subpage) {
           classes += 'bg-primary text-white rounded-full'
       } 
       return classes
   }
   if(toHome) {
       return <Navigate to={toHome} />
   }
    return (
        <div>
           <nav className="w-full flex mt-10 gap-2 justify-center">
           <Link className={LinkClases('profile')} to={"/account"}>My Profile</Link>
            <Link className={LinkClases("bookings")} to={'/account/bookings'}>My bookings</Link>
            <Link className={LinkClases("places")} to={"/account/places"}>My places</Link>
           </nav>
           {subpage === "profile" && (
               <div className="mt-10 text-center max-w-lg mx-auto">
                   <h1 className="text-center">Hello, {user.name} ({user.email})</h1> <br />
                   <button  onClick={logout} className="primary max-w-sm mt-2">Logout</button>
               </div>
           )}
        </div>
    )
}