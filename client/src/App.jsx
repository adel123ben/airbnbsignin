import {Routes, Route} from "react-router-dom";
import IndexPage from "./pages/indexPage";
import LoginPage from "./pages/LoginPage";
import Layout from "./layout";
import RegisterPage from "./pages/RegisterPage";
import axios from "axios";
import { UserContextProvider } from "./UserContext";
import { useEffect } from "react";
import Account from "./pages/account";


axios.defaults.baseURL = "http://localhost:4000";
axios.defaults.withCredentials = true;

export default function App() {
 

  return (
    <UserContextProvider>

   
    <Routes>
      <Route path="/" element={<Layout />}>
      <Route path="/" element={<IndexPage />} />
    <Route path="/login" element={<LoginPage />} />
    <Route path="/account/:subpage?" element={<Account />} />
    <Route path="/register" element={<RegisterPage />} />
      </Route>
    
    </Routes>
    </UserContextProvider>
  
  )
}