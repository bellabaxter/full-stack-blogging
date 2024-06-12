import React, { useState } from "react";
import { Link } from "react-router-dom";
import  axios  from "axios";



export default function Register() {

    const [inputs, setInputs] = useState({
        username: "",
        email: "",
        password: "",
      });
      const [err, setError] = useState(null);
    
      const navigate = useNavigate();
    
      const handleChange = (e) => {
        setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
      };
    
      const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          await axios.post("/auth/register", inputs);
          navigate("/login");
        } catch (err) {
          setError(err.response.data);
        }
      };

    
    return(
        <div className="auth">
            <h1>Register</h1>
            <form>
                <input required type="text" placeholder="Username" name="username" onChange={handleChange}></input>
                <input required type="email" placeholder="Email" name="email" onChange={handleChange}></input>
                <input type="password" placeholder="Password" name="password" onChange={handleChange}></input>
                <button onClick={handleSubmit}>Register</button>
                <p>This is an error!</p>
                <span>Already have an account? Try logging in <Link to ="/login">Click here</Link></span>

            </form>
        </div>
    );
}