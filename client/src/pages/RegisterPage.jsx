import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function RegisterPage() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    async function regiterUser(ev) {
        ev.preventDefault();
        try {
            await axios.post("/register", {
                name,
                email,
                password
            });
            alert("Succesfully registered. Now you can login");
        }catch (e) {
            alert("Registration failed. Please try again later");
        }
        
        
    }

    return (
        <div className="mt-4 grow flex items-center justify-around">
            <div className="mb-64">
            <h1 className="text-4xl text-center mb-4">Register</h1>
            <form onSubmit={regiterUser} className="max-w-md mx-auto">
                <input type="text" name="username" value={name} onChange={(e) => setName(e.target.value)} placeholder="Your username"  />
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} name="email" placeholder="your@email.com" />
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} name="password" placeholder="Your password" />
                <button className="primary">Register</button>
                <div className="mt-5 text-center py-2">All ready have an account? <Link className="text-primary hover:underline" to={"/login"}>Login</Link></div>
            </form>
            </div>
            
        </div>
    );
}