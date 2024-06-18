import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../context/authContext.jsx";

export default function Login() {
    const [inputs, setInputs] = useState({
        username: "",
        password: "",
      });
      const [err, setError] = useState(null);
    
      const navigate = useNavigate();
      const { login } = useContext(AuthContext);
    
      const handleChange = (e) => {
        setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
      };
    
      const handleSubmit = async (e) => {
         e.preventDefault();
        try {
          await login(inputs);
          navigate("/");
        } catch (err) {
          setError(err.response?.data || "An unexpected error occurred");
        }
      };

    return(
        <div className="auth">
            <h1>Login</h1>
            <form>
                <input required type="text" placeholder="Username" name="username" onChange={handleChange}></input>
                <input type="password" placeholder="Password" name="password" onChange={handleChange}></input>
                <button onClick={handleSubmit}>Login</button>
                {err && <p>{err}</p>}
                <span>Don't have an account? To register <Link to ="/register">Click here</Link></span>

            </form>
        </div>
    );
}