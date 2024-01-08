import { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../UserContext";

export default function LoginPage() {
    const [redirect, setRedirect] = useState(false);
   const {setUser} = useContext(UserContext);
    async function handelLoginSubmit(ev){
        ev.preventDefault();
        
      try{
      const {data} =  await axios.post('/login', {
            email,
            password
        });
        setUser(data);
        alert('Succesfully logged in');
        setRedirect(true);
      }catch(e){
          alert('Login failed. Please try again later');
      }
    }
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
  

    if(redirect){
        return <Navigate to={'/'} />
    }
    return (
        <div className="mt-4 grow flex items-center justify-around">
            <div className="mb-64">
            <h1 className="text-4xl text-center mb-4">Login</h1>
            <form onSubmit={handelLoginSubmit} className="max-w-md mx-auto">
                <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" name="email" placeholder="your@email.com" />
                <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" name="password" placeholder="Your password" />
                <button className="primary">Login</button>
                <div className="mt-5 text-center py-2">Don't have an account? <Link className="text-primary hover:underline" to={"/register"}>Register</Link></div>
            </form>
            </div>
            
        </div>
    );
}